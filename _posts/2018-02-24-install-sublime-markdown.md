---
layout: post
title: "sublime markdown安装和使用"
description: windows系统下sublime markdown的安装和使用方法。
categories: [备份]
tags: [sublime, markdown]
---


        需要安装插件：Markdown Editing / Markdown Preview / MarkdownTOC

---

## 利用Markdown Editing插件改配色

1. ctrl+shift+p打开命令面板
2. 输入 PM 打开 Preferences:MarkdownEditing Settings - User 
3. 修改文档内容为：

```
{
    "color_scheme": "Packages/User/SublimeLinter/Autumn (SL).tmTheme",
    // Layout
    "draw_centered": false,
    "word_wrap": true,
    "wrap_width": 120,//120好像是最大字符长度(我手动调整为了95，因为不想在sublime里编辑md时出现横排滚动条)
    "rulers": []
}
"color_scheme": "Packages/User/SublimeLinter/Autumn (SL).tmTheme",
和 Preference->Setting-User 里的内容一致

```


## 利用Markdown Preview插件支持mathjax

1. 打开 Preference -> Package Setting -> Markdown Preview -> Setting - User
2. 输入 "enable_mathjax": true
3. 说明：default里是false，user里改成true是为了支持mathjax


## 利用Markdown Preview插件修改默认打开MD文件的浏览器

1. 打开 Preference -> Package Setting -> Markdown Preview -> Setting - User
2. 输入 "browser": "D:\\Program Files\\Chrome\\Application\\chrome.exe"
3. 说明：default里是default，即默认浏览器；user里改成自己想用的浏览器的地址，浏览器地址可以参考Preference -> Key Bindings - User里的设置


## 利用Markdown Preview插件将md导出为html文档

1. 打开 Preference -> Package Setting -> Markdown Preview -> Setting - User
2. 输入 "build_action": "save",
3. 说明：save是按ctrl+b在当前文件夹生成html文件，default里是build，还有参数 browser/clipboard/sublime等。其中browser是在本地缓存中生成html文档，用浏览器打开；clipboard是转成html代码后复制到剪贴板；sublime是在sumblime中打开html代码。


## 利用Markdown Preview插件实现用github渲染md文档

1. 打开 Preference -> Package Setting -> Markdown Preview -> Setting - User
2. 输入 "parser": "github",
3. 说明：default里是default，还有参数 markdown。


## 利用Markdown Preview插件实现预览

1. ctrl+shift+p打开命令面板
2. 输入 mp 打开Markdown Preview:Preview in Browser
3. 选择markdown或github后自动打开浏览器
4. 我设置了快捷键f2


## 利用Markdown Preview插件设置浏览器中预览md文件的快捷键

1. 打开 Preferences->Key Bindings User
2. 输入 { "keys": ["f2"], "command": "markdown_preview", "args": {"target": "browser", "parser":"markdown"} }
3. 说明：f2是自定义的快捷键，点击f2会在系统盘缓存md的html文件，打开的就是这个缓存文件（看浏览器地址栏可知），所以最好经常清理 【C:\Users\用户名\AppData\Local\Temp 里面是临时文件 】里的文件。


## 实现浏览器自动刷新

1. 在md文件最后加入一行：`<meta http-equiv="refresh" content="0.1">`   
2. 说明：0.1表示刷新间隔，单位是秒，可以修改，但是太快或者太慢都会影响体验；为了不让滚动时编辑的新文字触底，可以在最后一行的刷新代码之上输入几个占空间的行。由于空行不会被解析，可以在每个空行前输入一个字符#或者打三个以上的减号表示分割线。


## 利用MarkdownTOC插件自动生成目录

### 安装插件

### 修改配置

打开 Preferences -> Package Settings -> MarkdownTOC -> Setting - User，修改default里的内容。

```
{
    "default_autolink": true, //目录以链接形式呈现
    "default_bracket": "round", //链接以圆括号包裹
    "default_depth": 0 //无限目录深度
}

```

### 使用方法

将光标置于文档首部，点击 Tools -> MarkdownTOC -> Insert TOC，会自动在文首生成目录。这个目录会随文档内容改变自动更新（需要保存来触发）。

