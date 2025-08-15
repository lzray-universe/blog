# 个人博客（Jekyll + GitHub Actions + GitHub Pages）

一键上传即可使用：支持 **Markdown**、**LaTeX（MathJax）**、RSS、SEO、站点地图。

## 快速开始（只需 3 步）
1. 新建一个 GitHub 仓库（例如 `my-blog`，默认分支为 `main`）。
2. 直接上传本 ZIP 的全部内容到仓库根目录。然后 **Commit**。
3. 在仓库 `Settings → Pages` 中：
   - **Source** 选择 `Deploy from a branch`
   - **Branch** 选择 `gh-pages`（/root），保存。  
   首次构建完成后，访问右上角显示的 Pages 链接（形如 `https://<你的用户名>.github.io/<仓库名>/`）。

> **之后写文章**：只需要在 `_posts/` 里新增 Markdown 文件（命名形如 `YYYY-MM-DD-your-title.md`），推送到 `main` 分支，Actions 会自动构建并发布。

---

## 写作说明

- Markdown 放在 `_posts/` 目录，**文件名**必须是：`YYYY-MM-DD-标题.md`。顶部加上 **YAML Front Matter**：
  ```yaml
  ---
  layout: post
  title: "我的第一篇文章"
  categories: [随笔]
  tags: [note, demo]
  ---
  ```

- **LaTeX 公式**（已启用 MathJax）：
  - 行内：`$E = mc^2$`
  - 行间：
    ```latex
    $$
    \int_0^1 x^2\,dx = \frac{1}{3}
    $$
    ```

- 新页面（如“关于”）：在 `pages/` 里新增 `.md`，开头：
  ```yaml
  ---
  layout: page
  title: 关于
  permalink: /about/
  ---
  ```

## 本地预览（可选）
如果你想在本地预览：
```bash
# 需要 Ruby（>=3.0）
gem install bundler
bundle install
bundle exec jekyll serve
```
然后打开 `http://127.0.0.1:4000`。

## 常用配置
- 修改站点标题：`_config.yml` 的 `title` / `description`。
- 如果是项目页（`https://<user>.github.io/<repo>/`），把 `_config.yml` 里的 `baseurl` 设置为 `/<repo>`。
- 自定义样式：编辑 `assets/css/style.css`。
- 自定义导航：编辑 `_data/nav.yml`（若不存在可创建）并修改 `_includes/header.html`。

## 部署细节
- 工作流文件：`.github/workflows/deploy.yml`
- 构建完成后自动推送到 `gh-pages` 分支；Pages 配置指向该分支即可。
- 你可以在仓库 `Actions` 页面查看构建日志。

> 如果你已有自定义域名，在 `Settings → Pages` 里添加域名，并在仓库根目录创建 `CNAME` 文件（内容为你的域名）。

---

**许可证**：MIT。尽情使用与二次定制。
