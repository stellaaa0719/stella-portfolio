"""Match HTML asset URLs to their actual bytes, with no third-party dependencies."""
import argparse
import hashlib
from pathlib import Path
import re
import shutil
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit


def version_html(root: Path, fingerprint_files: bool = False) -> None:
    root = root.resolve()

    def replace_tag(match):
        tag = match.group(0)

        def replace_url(attr):
            original = attr.group('value')
            url = urlsplit(original)
            if url.scheme or url.netloc or not url.path.endswith(('.js', '.css')):
                return attr.group(0)
            asset = (root / url.path).resolve()
            if not asset.is_relative_to(root):
                raise ValueError('Asset must stay inside website root')
            canonical_name = re.sub(r'\.[0-9a-f]{12}(?=\.(?:js|css)$)', '', asset.name)
            canonical = asset.with_name(canonical_name)
            if canonical.is_file():
                asset = canonical
            digest = hashlib.sha256(asset.read_bytes()).hexdigest()[:12]
            query = [(k, v) for k, v in parse_qsl(url.query) if k != 'v']
            if fingerprint_files:
                versioned = asset.with_name(f'{asset.stem}.{digest}{asset.suffix}')
                shutil.copyfile(asset, versioned)
                path = versioned.relative_to(root).as_posix()
            else:
                path = asset.relative_to(root).as_posix()
                query.append(('v', digest))
            value = urlunsplit(('', '', path, urlencode(query), url.fragment))
            return f'{attr.group("name")}="{value}"'

        return re.sub(r'(?P<name>src|href)="(?P<value>[^"]+)"', replace_url, tag)

    for html in root.glob('*.html'):
        source = html.read_text(encoding='utf-8')
        result = re.sub(r'<(?:script|link)\b[^>]*>', replace_tag, source)
        if result != source:
            html.write_text(result, encoding='utf-8')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('root', type=Path)
    parser.add_argument('--fingerprint-files', action='store_true')
    args = parser.parse_args()
    version_html(args.root, args.fingerprint_files)
