---
layout: post
title: "jekyll文章分类"
description: jekll blog文章分类和查询分类的方法。
category: jekyll
tags: [文章分类, category]
---

## 文章分类

### 文章只属于一个分类

当文章只属于一个分类时，在文章的头信息中使用category属性

```
--- 
layout: post
title:  "Jekyll--文章分类" 
category: jekyll 
---

```

### 文章属于多个分类

当文章属于多个分类时，在文章的头信息中使用categories属性，该属性接收一个数组

```
--- 
layout: post
title: "Jekyll--文章分类" 
categories: [jekyll, test]
---

```

### 输出所有分类

所有的分类信息都被存储在site对象的categories中，所以可以通过liquid的for标签进行输出

```
{% raw %}

{% for category in site.categories %}
<h2>{{ category | first }}</h2> </span>{{ category | last | size }}</span> 
<ul class="arc-list">
{% for post in category.last %} 
<li>{{ post.date | date:"%d/%m/%Y"}}<a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul> 
{% endfor %}

{% endraw %}

```

说明： 
* 使用 {{ category | first }} 输出分类的名称 
* 使用 {{ category | last | size }} 输出该分类下文章的数目 
* 遍历category.last输出所有文章的信息，构建到该文章的索引
* `{ % 内容 % }、{{ 内容 }}`需要转义才能原样输出
    - 转义方法：在前后加上`{ % raw % }{ % endraw % }`(要去掉花括号和百分号之间的空格)

出自[天涯孤鸟](http://cnitzone.com/blog/2015/01/jekyll-article-category/)


