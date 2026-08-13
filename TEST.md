# 测试指南

## 静态检查

```bash
git diff --check
node --check js/gallery.js
```

检查 `index.html` 的 `homepage_template: true`，并确认 `_layouts/default.html` 在首页仅加载 `js/gallery.js`，不加载旧的 `js/app.js`。

## 浏览器检查

构建站点后，在桌面和移动端宽度检查：首页简介与头像、News、Selected Publications、Notes、Daily 是否正常排列。论文条目应使用全宽文字布局，不显示占位配图或重复标题。Daily 轮播应只包含 `assets/hero-slides/1.jpg`、`2.jpg`、`3.jpg` 三张图片，左右按钮可循环切换，浏览器控制台没有 JavaScript 或 WebGL 异常。

## Jekyll 构建

```bash
jekyll build
```

如果本机通过 Bundler 管理 Jekyll，则运行 `bundle exec jekyll build`。
