# Stella 个人作品集

在线访问：https://stellaaa0719.github.io/stella-portfolio/

纯静态 HTML / CSS / JavaScript，无依赖安装或构建步骤。

## 页面结构

所有内容位于 `index.html`：星空封面 → 项目案例（平台全貌、三阶段体验、成果与口径、精简迭代案例）→ 履历背景 → 工具与应用 → 联系方式。站内入口使用同页锚点，不跳转到其他页面。原有 HTML 地址保留兼容入口。

- `star-cover.js` / `star-cover.css`：世界星图、交互与封面。
- `case-study.js` / `case-study.css`：情报、跟进、材料连续演示。
- `profile.css` / `mist-theme.css` / `single-page.css`：履历、配色与单页布局。
- `single-page.js`：联系方式复制。
- `assets/`：照片、简历、政策参考文件。

## 更新与发布

提交并 push 到 `main` 后，GitHub Pages 自动发布。`.nojekyll` 使静态资源直接发布。`netlify.toml` 中的 `ignore = "exit 0"` 跳过 Git 触发的 Netlify 构建；当前只更新 GitHub Pages。

本机预览：

```sh
python3 -m http.server 8766 --bind 127.0.0.1
```

打开 http://127.0.0.1:8766/ 。

## 演示与事实边界

作品集不连接营销平台 API、数据库或腾讯云。演示使用预设案例，政策参考来自所附 PDF。成果沿用既有指标：70% 为情报筛选整理效率提升；800 万元为潜在线索，非签约收入；20% 为有效商机转化率增幅，非百分点。未补写样本量或评估明细。

业务演示支持来源筛选、依据联动、反馈选择、人工确认、客户背景复用、章节切换、局部改写、引导和重置。预算与周期保持待确认。星图尊重减少动态效果偏好，支持关闭动画、触控和键盘操作。

平台全貌按业务经营、情报与知识、智能协作、经营管理归纳模块；三阶段演示聚焦其中一条链路。首屏仅展示代表性产物，成果数字与解释集中在结果区。
