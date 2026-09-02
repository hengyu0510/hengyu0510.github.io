# Agents.md

本文件给后续参与本仓库的代码代理使用。请先读完本文件，再修改项目。

## 项目概览

这是 `hengyu0510.github.io` 的个人主页仓库，面向 GitHub Pages 部署。项目是静态 Jekyll 站点，不使用 Node 包管理器，也没有前端构建步骤。页面主要由 HTML/Liquid、Markdown、CSS 和原生 ES modules 组成。

核心内容：

- 首页：`index.html`（直接采用 YongchaoChen 式窄版学术主页模板，包含简介、News、Selected Publications、Notes 和 Daily）
- 关于页：`about.html`
- 404 页：`404.html`
- 文章：`_posts/*.md`
- 布局模板：`_layouts/default.html`、`_layouts/post.html`
- 样式：`css/style.css`
- 前端入口：`js/app.js`
- Three.js 与 hero 粒子效果：`js/three.module.js`、`js/hero/*`
- 全局点击烟花效果：`js/GlobalClickFireworks.js`
- 图片资源：`assets/hero-slides/*.jpg`、`assets/images/Framework.png`
- GitHub Pages 工作流：`.github/workflows/static.yml`

`ruihong04.github.io-main/` 是被 `_config.yml` 和 `.gitignore` 排除的参考/遗留目录，不属于当前站点构建输入。除非用户明确要求迁移或对比，不要修改它。

## 技术栈与构建

本站通过 GitHub Actions 的 `actions/jekyll-build-pages@v1` 构建并部署到 GitHub Pages。工作流在推送到 `main` 或手动触发时运行。

当前仓库没有 `Gemfile`、`package.json` 或锁文件。修改时不要随意引入新的构建系统、包管理器或大型依赖。

常用本地预览方式：

```powershell
jekyll serve
```

如果本机使用 Bundler 管理 Jekyll，也可以在有对应环境时运行：

```powershell
bundle exec jekyll serve
```

验证构建可用：

```powershell
jekyll build
```

构建产物 `_site/`、缓存目录 `.jekyll-cache/`、`.sass-cache/` 不应提交。

## 内容与模板约定

文章放在 `_posts/`，文件名遵循 Jekyll 约定：

```text
YYYY-MM-DD-title.md
```

文章 front matter 通常包含：

```yaml
---
layout: post
title: "文章标题"
date: YYYY-MM-DD
column: notes
description: "文章描述"
---
```

`column` 决定文章在首页哪个栏目展示，当前可用值：

- `notes`：学习笔记，对应首页 `Notes` 栏。
- `researches`：研究成果、项目记录、论文阅读，对应首页 `Researches` 栏。
- `daily`：日常记录，对应首页 `Daily` 栏。

`researches` 栏的文章可选用以下 front matter 字段，让首页论文条目采用 Yongchao 原版式排版：

```yaml
---
layout: post
title: "论文标题"
date: YYYY-MM-DD
column: researches
description: "一句话摘要，会显示在论文条目下方"
authors: "First Author, Hengyu Wang, Last Author"  # 只列核心作者即可；其中 Hengyu Wang 自动加粗
venue: "会议/期刊/arXiv 信息"
publication_url: "https://arxiv.org/abs/xxxx"       # 论文标题点击后跳转到该链接（新标签打开）
theme: "研究主题"                                    # 可选：紫色分组小标题（同一 theme 的论文归为一组，仿原版）
thumbnail: "/assets/images/xxx.jpg"                 # 可选：160px 缩略图（真实图片才填，无图不显示占位）
thumbnail_hover: "/assets/images/xxx.mp4"           # 可选：hover 时淡入的视频，需要同时有 thumbnail
---
```

`theme` 用于在 Selected Publications 里生成紫色主题小标题（对应原版 `<h2 style="color:purple">` 分组）。首页按发布日期倒序遍历 `researches` 文章，`theme` 发生变化时插入一个紫色小标题；相邻且 `theme` 相同的论文归入同一组。若省略 `theme`，则不显示分组标题。合著论文可在 `authors` 里只列核心作者（Core Authors），`Hengyu Wang` 会自动加粗。

首页论文条目只显示：标题（点击跳转 `publication_url`，即 arXiv 链接）、作者、venue，以及可选的 `description` 摘要；不再单独列出 Paper / Writeup / Code / Project Page 链接。不填 `thumbnail` 时论文条目回退为全宽文字（不显示占位配图）。

站点启用了 MathJax，数学内容可使用 `$...$`、`$$...$$`、`\(...\)`、`\[...\]`。`_config.yml` 中使用 `kramdown` 和 `math_engine: mathjax`。

写链接和图片路径时，优先使用 Jekyll 的 `relative_url`，例如：

```liquid
{{ '/assets/images/Framework.png' | relative_url }}
{{ '/about.html' | relative_url }}
```

`_layouts/default.html` 和 `_layouts/post.html` 里对部分旧文章标题/描述有基于 `page.path` 的特殊覆盖逻辑。改文章标题、路径或摘要时，要检查这些 Liquid 条件是否还需要保留。

## 前端结构

`js/app.js` 是旧版交互入口，负责：

- 如果页面提供 `#scene-canvas`，初始化 hero 粒子场景；当前首页使用学术主页布局，不显示 hero canvas。
- 初始化全局点击烟花效果。
- 处理滚动进度和视口尺寸。
- 绑定页面滚动按钮。
- 绑定 `.reveal` 入场动画。
- 处理文章摘要折叠/展开。
- 初始化旧版 gallery 轮播。

当前学术模板首页只加载轻量的 `js/gallery.js` 处理 Daily 图片轮播，不加载 Three.js、hero 或烟花模块；这样首页在不支持 WebGL 的浏览器中也能正常显示。`js/app.js` 和 `js/hero/*` 仅作为旧版交互代码保留，当前页面不加载。

`js/hero/config.js` 集中管理 hero 效果参数，包括移动端断点、相机、粒子数量、图片 atlas、交互强度和滚动范围。调整 hero 视觉效果时优先改这里，再考虑改 `ParticleHero.js` 或 shader。

`js/hero/atlasBuilder.js` 会把 `assets/hero-slides/` 的图片拼接为滚动 atlas；图片加载失败时会生成 canvas fallback。改 hero 图片数量或路径时，要同步检查：

- `js/hero/config.js` 的 `atlas.imageUrls`
- `index.html` 中 `data-gallery-images`
- `assets/hero-slides/` 下实际图片文件

`js/GlobalClickFireworks.js` 会动态向 `body` 添加固定定位 canvas。样式依赖 `css/style.css` 中的 `.global-fireworks-canvas`。

## 样式约定

样式集中在 `css/style.css`。当前首页直接采用经典学术个人主页模板：白色背景、Lato 字体、`max-width: 800px` 的居中 table 排版、News 滚动区和论文条目；文章页和关于页沿用同一套排版。修改样式时：

- 优先复用 `:root` 里的纸张、文字、辅助文字、分隔线和链接颜色变量。
- 保持移动端断点：`720px`、`480px`；旧 hero 模块仍使用 `820px` 作为内部粒子配置断点。
- 修改导航、首页分区、gallery、文章页时同时检查桌面和移动端。
- 不要无关重命名大量类名；HTML、CSS、JS 中有多处类名/ID 互相绑定。
- 注意 `prefers-reduced-motion: reduce`，新增动画时也要考虑降级。

## 资源约定

图片资源直接提交到 `assets/`。新增图片时尽量控制体积，避免无必要的大文件。文章内图片优先放到 `assets/images/`，首页 hero/gallery 图片放到 `assets/hero-slides/`。

不要删除现有图片，除非确认没有被以下位置引用：

- `index.html`
- `_posts/*.md`
- `js/hero/config.js`
- `css/style.css`

## 变更边界

本仓库可能包含用户未提交的文章或页面改动。开始工作前先查看：

```powershell
git status --short
```

不要回滚、覆盖或格式化用户已有改动。若必须编辑同一文件，先阅读相关 diff 并只做任务所需的最小修改。

对于普通内容更新，优先只改对应的 Markdown 或页面片段。对于视觉或交互更新，保持改动集中，不要顺手重构整个 CSS 或 Three.js 模块。

## 提交前检查

根据改动类型选择检查项：

- 文档或文章改动：检查 Markdown/front matter 是否正确。
- 页面或 Liquid 改动：运行 `jekyll build`。
- CSS/JS 交互改动：本地预览并检查浏览器控制台。
- hero、gallery、canvas、响应式布局改动：至少检查桌面宽度和移动端宽度。

如果本机缺少 Jekyll 环境，说明未能运行构建，并列出已做的静态检查。
