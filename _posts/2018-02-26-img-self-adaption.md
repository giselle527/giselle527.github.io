---
layout: post
title: "图片自适应"
description: 
categories: []
tags: []
---

## 当图片通过img标签引入时

用容器（假设为div）包住img，为img添加如下属性：

```
img{
    width: auto\9;
    width: 100%;
    max-width: 100%;
    height: auto;
    overflow: hidden;
}

```
\9是hack css的一种写法，在正常css代码后面加"\9"，只有IE浏览器能识别，其他浏览器会忽略这条语句。目的是兼容IE浏览器。

```
<div>
    <img src="xxx" />
</div>

```

### css hack

css hack的目的就是使CSS代码兼容不同的浏览器，也可以反过来利用CSS hack为不同版本的浏览器定制编写不同的CSS效果。

* IE6识别`*和_`，不识别 !important
* IE7识别`*, 不识别_`，识别 !important
* firefox不识别`*和_`，识别 !important　


## 当图片是背景图片时

给元素添加如下属性：

```
background:url(xxxx) center no-repeat;
background-size: 100% 100%; //注意：百比分是背景图的宽高相对于元素的宽高计算出来的，元素的宽高含padding值。

```

参见[如何用CSS实现背景图片自适应](https://www.w3cschool.cn/css3/question-10231610.html)


