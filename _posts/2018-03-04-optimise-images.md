---
layout: post
title: "图片优化"
description: 在网上搜集的优化图片的方法。
categories: []
tags: []
---

很多特效（渐变、阴影、圆角等等）都可以用纯粹的HTML、CSS、SVG等加以实现，实现这些效果少则寥寥数行代码，多则加载额外的库（一张普通的照片比非常强大的效果库大许多）。这些效果不但需要的空间很小，而且在多设备、多分辨率下都能很好的工作，在低级浏览器上也可以实现较好的功能降级。因此在存在备选技术的情况下，应该首先选择这些技术，只有在不得不使用图片的时候才加入真正的图片。

## 图片的替代品

* CSS，CSS动画越来越强大。与分辨率无关，缩放不影响清晰度，占用空间小。 
* 网络字体。既能保持文字的可搜索性又能扩展显示的样式。

## 图片格式解读

| 图片格式 | 压缩方式 | 透明度 | 动画 | 浏览器兼容 | 适用场景 |
| :---:    | :---:    | :---:  | :---:|  :---      |  :---    |
| JPEG | 有损压缩 | 不支持 | 不支持 | 所有 | 复杂颜色及形状、尤其是照片 | 
| GIF | 无损压缩 | 支持 | 支持 | 所有 | 简单颜色，动画 | 
| PNG | 无损压缩 | 支持 | 不支持 | 所有 | 需要透明时 | 
| SVG | 无损压缩 | 支持 | 支持 | 所有（IE8以上） | 简单图形，需要良好的缩放体验，需要动态控制图片特效 | 

## 图片优化工具

### 常用工具

| 工具 | 用途 | 用法 |
| :--: | :--: | :--- |
| [在线网站](https://tinypng.com/) | 优化PNG/JPG图片 | 1.把需要优化的图片拖拽进ImageOptim，就能够完成对图片的优化。2.可以批量拖拽。 |
| SVGO工具 | 优化SVG | [张鑫旭大神的教程](http://www.zhangxinxu.com/wordpress/2016/02/svg-compress-tool-svgo-experience/)写的很详细。 |
| jpegtran | 优化JPG图片 | search |
| OptiPNG | 优化无损PNG | search |
| AdvPNG | 优化无损PNG | search |
| PNGQuant | 优化有损PNG | search |


## 自动优化工具

### CDN

[张鑫旭大神的教程](http://www.zhangxinxu.com/wordpress/2016/02/svg-compress-tool-svgo-experience/)写的很详细。 

> 工作方式：向CDN请求图片的URL参数中包含图片处理的参数（格式、宽高等），CDN服务器根据请求生成所需的图片，发送到用户浏览器。

### Grunt/Gulp

前端工程师的重复性工作，例如合并静态资源、压缩JS和CSS文件、编译SASS等都可以使用Grunt等自动化工具批量完成，图片优化也是如此。grunt-image非常强大，支持批量自动优化PNG、JPG、SVG和GIF，支持单图片优化和全目录优化。

{% highlight javascript linenos %}
module.exports = function (grunt) {
    grunt.initConfig({
        image: {
            // 指定单独的图片优化
            static: {
                options: {
                    pngquant: true,
                    optipng: true,
                    advpng: true,
                    zopflipng: true,
                    pngcrush: true,
                    pngout: true,
                    mozjpeg: true,
                    jpegRecompress: true,
                    jpegoptim: true,
                    gifsicle: true,
                    svgo: true
                },
                files: {
                    'dist/img.png': 'src/img.png',
                    'dist/img.jpg': 'src/img.jpg',
                    'dist/img.gif': 'src/img.gif',
                    'dist/img.svg': 'src/img.svg'
                }
            },
            // 指定图片目录进行优化
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'dist/'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-image');
};
{% endhighlight %}

↑不是很懂，需要亲自试一下，看看效果。



[文档信息出处，侵删~](https://www.2cto.com/kf/201607/531909.html)


## 待学习内容

* [页面有大量图片，优化图片的加载方法](https://www.2cto.com/kf/201607/531909.html)
* [25种提高网页加载速度的方法和技巧](https://www.cnblogs.com/xp796/p/5236945.html)
* [Web前端性能优化——如何提高页面加载速度](https://www.cnblogs.com/MarcoHan/p/5295398.html)
* [优化HTML代码的多种技巧](http://blog.csdn.net/powertoolsteam/article/details/50512148)
* [前端开发中，对图片的优化技巧有哪些？](https://www.zhihu.com/question/21815101)
* [20 个有用的 SVG 工具，提供更好的图像处理](https://www.oschina.net/translate/20-useful-svg-tools-for-better-graphics)



