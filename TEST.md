# 测试指南

## 静态检查

```bash
git diff --check
node --check js/gallery.js
```

检查 `index.html` 的 `homepage_template: true`，并确认 `_layouts/default.html` 在首页仅加载 `js/gallery.js`，不加载旧的 `js/app.js`。

## 浏览器检查

构建站点后，在桌面和移动端宽度检查：首页简介与头像、News、Selected Publications、Notes、Daily 是否正常排列。头像应为原版式椭圆形（`border-radius: 50% / 40%`），点击可打开原图。Selected Publications 中，设置了 `theme` 的论文上方会出现紫色主题小标题（相同 `theme` 归为一组）。论文条目默认使用全宽文字布局，不显示占位配图或重复标题；若某篇文章 front matter 提供了真实的 `thumbnail`（可再选配 `thumbnail_hover` 视频），该条目左侧会显示 160px 缩略图卡片，桌面端 hover 时淡入视频，移动端缩略图堆叠在文字上方。合著论文的作者行只列核心作者时，`Hengyu Wang` 应自动加粗。Daily 轮播应只包含 `assets/hero-slides/1.jpg`、`2.jpg`、`3.jpg` 三张图片，左右按钮可循环切换，浏览器控制台没有 JavaScript 或 WebGL 异常。

## Jekyll 构建

```bash
jekyll build
```

如果本机通过 Bundler 管理 Jekyll，则运行 `bundle exec jekyll build`。
