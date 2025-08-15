---
layout: default
title: 首页
---

<h1>最近文章</h1>
<ul class="post-list">
  {% for post in site.posts %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span style="color:#666;">— {{ post.date | date: "%Y-%m-%d" }}</span>
  </li>
  {% endfor %}
</ul>
