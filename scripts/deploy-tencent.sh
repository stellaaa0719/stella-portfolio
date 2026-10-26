#!/usr/bin/env bash
set -euo pipefail

: "${DEPLOY_HOST:?Missing DEPLOY_HOST secret}"
: "${DEPLOY_USER:?Missing DEPLOY_USER secret}"
: "${DEPLOY_SSH_KEY:?Missing DEPLOY_SSH_KEY secret}"
: "${DEPLOY_HOST_PUBLIC_KEY:?Missing verified DEPLOY_HOST_PUBLIC_KEY variable}"
[[ "$DEPLOY_HOST" =~ ^[a-zA-Z0-9.-]+$ && "$DEPLOY_USER" =~ ^[a-z_][a-z0-9_-]*$ ]] || exit 1
[[ "$DEPLOY_HOST_PUBLIC_KEY" == ssh-ed25519\ * ]] || exit 1
backup_id="${GITHUB_RUN_ID:?}-${GITHUB_RUN_ATTEMPT:?}"
[[ "$backup_id" =~ ^[0-9]+-[0-9]+$ ]] || exit 1

task_dir=$(mktemp -d)
trap 'rm -rf -- "$task_dir"' EXIT
export PORTFOLIO_PACKAGE="$task_dir/site"
mkdir -p "$PORTFOLIO_PACKAGE"

# Publish only tracked static website files; never upload Git, workflows or credentials.
python3 - <<'PY'
import os, pathlib, shutil, subprocess
out = pathlib.Path(os.environ['PORTFOLIO_PACKAGE'])
for name in subprocess.check_output(['git', 'ls-files', '-z']).decode().split('\0'):
    if not name:
        continue
    path = pathlib.Path(name)
    if path.is_absolute() or '..' in path.parts or path.is_symlink():
        raise SystemExit('Unsafe website path')
    if not ((len(path.parts) == 1 and path.suffix in {'.html', '.css', '.js'}) or path.parts[0] == 'assets'):
        continue
    target = out / path
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(path, target)
for required in ['index.html', 'single-page.css', 'star-cover.js', 'assets/stella-portrait.png', 'assets/stella-product-manager-resume.pdf']:
    if not (out / required).is_file():
        raise SystemExit('Missing website asset: ' + required)
PY

umask 077
printf '%s\n' "$DEPLOY_SSH_KEY" | tr -d '\r' > "$task_dir/key"
printf '%s %s\n' "$DEPLOY_HOST" "$DEPLOY_HOST_PUBLIC_KEY" > "$task_dir/known_hosts"
ssh_opts=(-F /dev/null -i "$task_dir/key" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -o "UserKnownHostsFile=$task_dir/known_hosts" -o ConnectTimeout=20 -o ServerAliveInterval=15 -o ServerAliveCountMax=3)
remote="$DEPLOY_USER@$DEPLOY_HOST"

# No sudo, Nginx reload, process restart or backend access is needed.
ssh "${ssh_opts[@]}" "$remote" "bash -s -- '$backup_id'" <<'REMOTE'
set -euo pipefail
site=/var/www/stella-portfolio
command -v rsync >/dev/null
test -d "$site"
test ! -L "$site"
test -w "$site"
test -r "$site/index.html"
if [ -n "$(find "$site" -type l -print -quit)" ]; then
  echo 'Refusing to publish through existing website symlinks.' >&2
  exit 1
fi
if [ -n "$(find "$site" -type d ! -writable -print -quit)" ]; then
  echo 'A website subdirectory is not writable by the deployment user.' >&2
  exit 1
fi
backup_dir="$HOME/.local/state/stella-portfolio/backups"
mkdir -p "$backup_dir"
chmod 700 "$backup_dir"
tar -czf "$backup_dir/before-$1.tar.gz" -C "$site" .
echo 'Existing portfolio backed up.'
REMOTE

# Keep server-only files; delay replacements until transfer finishes.
printf -v rsync_ssh '%q ' ssh "${ssh_opts[@]}"
rsync -rlt --delay-updates --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r \
  -e "$rsync_ssh" "$PORTFOLIO_PACKAGE/" "$remote:/var/www/stella-portfolio/"

# Verify every published file on the server, not just the SSH exit code.
(cd "$PORTFOLIO_PACKAGE" && find . -type f -print0 | sort -z | xargs -0 sha256sum) > "$task_dir/manifest"
ssh "${ssh_opts[@]}" "$remote" 'cd /var/www/stella-portfolio && sha256sum --check --quiet' < "$task_dir/manifest"
echo 'Portfolio deployed and all uploaded file hashes verified.'
