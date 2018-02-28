---
layout: post
title: "修改默认浏览器"
description: win7系统下用注册表修改默认浏览器的方法。
categories: [备份]
tags: [默认浏览器, chrome]
---

## 在注册表中修改默认浏览器

1. win+r打开运行，输入regedit，打开注册表；
2. 选中HKEY_CLASSES_ROOT，按ctrl+f搜索http(查找界面只需勾选项)；
3. 依次打开http-shell-open，点击command，在右侧双击`默认`，修改数值数据为浏览器地址，比如`D:\Program Files\ChromePortable\Chrome.exe`；
4. 在open文件夹下点击ddeexec，在右侧双击`默认`，修改数值数据为浏览器名称(通过浏览器的快捷方式的属性可查看，在快捷方式栏下的第一行，比如`Chrome.exe`)。

### moren.reg

上述方法如果不起作用，在`我的front-end仓库\tools\chrome`下，双击运行`moren.reg`文件即可。
