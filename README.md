# Stella 个人作品集

个人域名：https://zuojunli.com

备用预览：https://stellaaa0719.github.io/stella-portfolio/

纯静态 HTML / CSS / JavaScript，无依赖安装或构建步骤。

## 页面结构

所有内容位于 `index.html`：星空封面 → 个人介绍（现任职与教育背景）→ 产品经历（平台全貌、三阶段体验、成果与口径）→ 工具应用 → 联系方式。站内入口使用同页锚点，不跳转到其他页面。原有 HTML 地址保留兼容入口。

- `star-cover.js` / `star-cover.css`：世界星图、交互与封面。
- `case-study.js` / `case-study.css`：情报、跟进、材料连续演示。
- `profile.css` / `mist-theme.css` / `single-page.css`：履历、配色与单页布局。
- `single-page.js`：联系方式复制。
- `assets/`：照片、简历、政策参考文件。

## 更新与发布

提交并 push 到 `main` 后，`Deploy portfolio to Tencent Cloud` 自动同步静态网站到腾讯云 `/var/www/stella-portfolio`，也支持在 Actions 页手动运行。GitHub Pages 继续提供备用预览；Netlify Git 构建仍由 `ignore = "exit 0"` 跳过。

自动部署配置：

- Repository Secrets：`DEPLOY_HOST`、`DEPLOY_USER`、`DEPLOY_SSH_KEY`。
- Repository Variable：`DEPLOY_HOST_PUBLIC_KEY`，必须从服务器控制台读取并核对；不能使用未经核对的 SSH 扫描结果替代。
- 部署使用 SSH 严格主机校验，只传输已跟踪的根目录 HTML/CSS/JS 与 `assets/`，不上传 Git、部署脚本、密钥或工作流。
- 每次部署前在服务器用户目录 `~/.local/state/stella-portfolio/backups/` 保存旧网站压缩包。备份需按磁盘容量定期归档；流程不自动删除备份。
- 不删除服务器额外文件，不使用 sudo，不修改 Nginx、营销平台进程或数据库。传输后逐一核验文件 SHA-256；失败时查看 Actions 日志，修正后重新运行。
- 网站目标目录及其子目录须由部署用户可写，服务器需安装 rsync。

本机预览：

```sh
python3 -m http.server 8766 --bind 127.0.0.1
```

打开 http://127.0.0.1:8766/ 。

## 演示与事实边界

作品集演示不调用营销平台 API 或数据库。演示使用预设案例，政策参考来自所附 PDF。成果沿用既有指标：70% 为情报筛选整理效率提升；800 万元为潜在线索，非签约收入；20% 为有效商机转化率增幅，非百分点。未补写样本量或评估明细。

业务演示支持来源筛选、依据联动、反馈选择、人工确认、客户背景复用、章节切换、局部改写、引导和重置。预算与周期保持待确认。星图尊重减少动态效果偏好，支持关闭动画、触控和键盘操作。

平台全貌按业务经营、情报与知识、智能协作、经营管理归纳模块；三阶段演示聚焦其中一条链路。项目介绍采用横向通栏，成果数字与解释集中在结果区。

## 星空延续

同一个 Canvas 覆盖全页：封面保持世界星图，滚动后大陆和连线淡去，散星收向两侧；产品界面和正文区保持干净。封面退出后只绘制精简散星，不再计算地图连线。后台标签页暂停绘制。

个人介绍卡片直接展示，不使用显现动画或小星点交互。关闭动画或启用 prefers-reduced-motion 时，背景星点保持静态。

个人介绍在封面后使用毕业照与任职、教育信息的左右布局；手机端照片在上，高度受限。照片保留原色，使用 CSS 裁切、细线边框与轻微圆角，不叠加粒子、滤镜或发光效果。
