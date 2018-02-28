---
layout: post
title: "回车和换行"
description: 用gitbash时会提示转换回车和换行。
categories: [备份]
tags: [git, CR, CRLF, LF]
---

## 回车与换行的区别

|符号|ASCII码|中文|英文|控制字符|释义|
|:-:|:-:|:-:|:-:|:-:|:-:|
|\n|10|换行|new line/line feed|LF|光标到下一行(不一定到行首)|
|\r|13|回车|carriage return|CR|光标回到本行开头|

>由于历史原因，不同的操作系统的line-ending（即回车和换行字符）的表现不同。ENTER键的定义与操作系统有关，通常Enter是\n和\r结合起来的效果。  

|系统|行末结束符|缩写|
|:-|:-|:-|
|UNIX|\n|LF|
|WINDOWS|\n\r|CRLF|
|MAC/OS|\r|CR|

|缩写|中文|英文|
|:-|:-|:-|
|CRLF|回车换行|carriage return line feed|
|LF|换行|line feed|
|line ending|行尾结束符|line ending|

## 在git中转换回车换行  

语法：`$git config --global core.autocrlf true`  

> core.autocrlf是git中负责处理line-ending的变量，可以设置三个值：true/input/false  
`$git config --global core.autocrlf true`  
Git可以在你提交时，自动地把行尾结束符CRLF转换成LF，而在签出代码时把 LF转换成CRLF，适用于windows系统。    
`$git config --global core.autocrlf input`  
 Git在提交时把CRLF转换成LF，签出时不转换，适用于Linux/Mac。  
 `$git config --global core.autocrlf false`  
如果你是Windows程序员，且正在开发仅运行在Windows上的项目，可以设置 false取消此功能，把回车符记录在库中。
