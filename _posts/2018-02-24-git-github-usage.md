---
layout: post
title: "git和github的使用方法"
description: 网上搜集的资料加上自己的理解和在实际使用中遇到的问题。
categories: [备份]
tags: [github, git, git-bash, 命令行命令, git命令]
---

## github  
  
**简介**  

一个网站/社交平台，可以存放代码，有很多开源项目。
  
**详介**   

github是程序猿的代码托管平台，也是基于git的开源分布式版本控制系统，因此github官网上并没有为用户准备一个很好的代码上传系统。若想快速高效地将本地代码上传到github，需要做到以下几点：

1. 在本地安装git工具，这样才能在本地环境中使用git命令行（例如：$ git add index.html）；   
2. 要将本地git连接到自己的github账户上，这样才能把代码文件上传上去。每一次更改都会形成一个版本记录，便于团队协作管理。 

github页面上的 watch 是关注，star 是赞，fork 是复制一份到自己的账号。

## git  
  
一个工具，主要作用是版本控制，需要安装到本地。安装文件夹下会有`git-bash.exe`和`git-cmd.exe`两个应用程序，bash在cmd的基础上增添了一些新的命令与功能，建议直接使用bash。

### git工具和github客户端的关系

git工具是github客户端的命令行版，github客户端是git工具的可视版。二者装一个就行了，我习惯用git-bash，所以不用装github客户端。

### git的主要作用  
  
1. 回退，即退回到之前版本；
2. 历史，即查看历史版本；
3. 差异，即查看版本和版本之间有哪些不同，做了哪些变化等。

### 常用的版本控制工作

除了git这个当前最主流的版本控制工具外，还有svn、cvs等。

## 使用git工具

### 将git连接到github网站
  
**Step1 设置贡献者**  
  
打开git-bash，逐条输入并回车：    
git config --global  user.email "你的邮箱"    
git config --global  user.name "你的用户名"     
           
> git config  --global参数表示这台机器上所有的Git仓库都会使用这个配置(即相同的邮箱和用户名)，也可以对某个仓库指定不同的用户名和邮箱。
  
**Step2 生成ssh**  
      
> ssh是一种传输代码的方法，专为远程登录会话和其他网络服务提供安全性的协议，安全且快速。
  
1. 继续输入：      
ssh-keygen -t rsa -C "注册邮箱"   
2. 一路回车，直到出现randomart image；   
3. 回车中途会出现：    
路径选择→提示选择ssh-key生成路径，直接点回车将其生成在默认路径中即可；    
密码确认→不用使用密码进行登录，直接回车即可。   
  
**Step3 在github网站添加ssh**
  
1. 找到文件夹`.ssh`（路径为：C:\Users\用户名\\.ssh），该文件夹下有2个文件：`id_rsa`私钥和`id_rsa.pub`公钥；    
2. 用代码编辑器打开`id-rsa.pub`，复制所有内容；    
3. 登录github网站，头像(网页右上角)→settings→SSH and GPG keys(网页左边侧栏)→New SSH key(网页右边，头像下边)→title(随便填)→Key(粘贴id-rsa.pub里的所有内容)→Add SSH key   
  
**Step4 测试是否连接成功**
      
在git-bash中输入并回车：  
ssh -T git@github.com   
出现`Hi xxx! You've successfully authenticated, but GitHub does not provide shell access.`说明已通过身份验证，连接成功。   

### 通过git提交代码

#### 在github上建立仓库

<center>
    <img src="/images/github0.jpg" width="500"/>
</center>

#### 在github上删除仓库

<center>
    <img src="/images/github1.jpg" width="500" />
</center>

点开settings后，将页面拉到最底部

<center>
    <img src="/images/github2.jpg" width="500" />
</center>

#### 把本地的文件上传到仓库中
    
1. 在git-bash中创建一个版本库(就是要上传文件的文件夹)；   
2. 在命令行中敲git init，初始化，目的是让这个目录归git管理；   
3. 命令行中会输出Initialized empty Git repository in "文件夹路径"/.git/，.git目录是Git用来跟踪管理版本库的，默认隐藏；  
4. 继续敲git add <file>，<file>处敲文件名，或者敲git add .，.代表所有的文件；
5. 继续敲git commit -m "提交日志"，日志是对此次上传操作的简介；
6. 连接远程地址，继续敲git remote add origin 远程仓库地址(这一步相当于是给github仓库起了一个代号：origin，并把origin加到远程仓库代号的集合remote里)；  
7. 本地文件推送到远程仓库，继续敲git push -u origin master，-u 是 `--set-upstream` 的简写，把本地工作区与远程仓库对应起来。  

#### 新建/修改/删除本地文件并同步到远程仓库
    
1. 在本地版本库添加/修改/删除文件；   
2. git add 文件名 或 git add -u 或 git add -A 或 git add . →提交到暂存区；   
3. git commit -m "提交日志" → 写提交日志；   
4. git push → 同步到远程仓库。  
           
#### 删除本地文件夹/文件并同步到远程仓库
  
1. git rm 文件名 或 git rm -r 文件夹名(r是recursiveness，递归，递归删除的意思，会删掉该文件夹及所包含的子内容)      
2. git commit -m "提交日志"    
3. git push    
    
> `git rm <file>`和`rm <file>`是有区别的！本地文件夹叫工作区；工作区里有一个.git文件夹叫版本库；版本库里有一个暂存区（stage），add是提交到暂存区的方法之一，commit是生成新版本，每次提交后用`git log`输出历史，会发现有新版本。rm只删除了工作区的文件，跟git没关系；git rm删除了工作区和暂存区对应的文件，git rm & git commit & git push会删除工作区、暂存区、远程库对应的文件，同时在历史里会新增一个删除文件的版本。  

## 常用的命令行命令

* mkdir 新建
* cd 打开
* cd .. 返回上级目录，ps:cd和..之间有一个空格
* cd /d 打开d盘，ps:cd和/之间有一个空格
* pwd 显示当前目录
* 右键菜单→paste 粘贴，ps:ctrl+v无法实现粘贴
* tab键自动补全
* ls=list→查看文档列表（不是git命令）
    * 小提示：git ls-files可以查看暂存区的文件
* 输入i开始编辑
* 输入ESC退出编辑状态
* 输入:wq保存退出
* cat filename→catalogue输出文件内容
* rm -v filename→因为有-v，会多输出一行删除记录
* echo xxx > yyy→在名为yyy的文件里写入xxx，如果yyy文件本身有内容，会被xxx覆盖；如果yyy文件不存在，会新建一个yyy文件并写入xxx，专业说法是：echo重定向写入
* echo zzz >> yyy→效果同上，有些微差别。在名为yyy的文件里写入zzz，如果yyy文件本身有内容xxx，会在xxx后添加zzz；如果yyy文件不存在，会新建一个yyy文件并写入zzz，专业说法是：echo重定向写入

## 常用的git命令

* git init 初始化
* git --version 查看git版本
* git status 查看git状态，总共有9种状态，常见到的有以下5种：
    * untracked files 未被git管理的文档
    * modified 被修改了的文档，显示红色表示是对工作区文件进行了修改，显示绿色表示对暂存区文档进行了修改
    * staged 代码在暂存区
    * deleted 代码被删除
    * both modified 多在merge/pull/rebase/revert时发生了conflict时显示
* git log 查看历史
    * git log --pretty=oneline 查看简写版历史（包括版本号和提交日志...）
    * git log --graph --pretty=oneline --abbrev-commit 查看图像版历史
    * git reflog 查看所有的版本号及相关信息
* git diff 查看差异
    * 无参数的情况下，查看的是working tree和last commit之间的差异
    * 有参数的情况下，如 `git diff a b`，a和b为版本号，查看的是a版本和b版本之间的差异
    * git diff→diff的是工作区代码的差异
    * git diff --cached→diff的是暂存区代码的差异
    * 显示 modified: xxxx文件名 时，如果想看文件做了哪些修改，直接 git diff 文件名 就可以(-表示删除，+表示添加，没写表示没有改动)
* git commit 提交/前进功能
* git revert 转换/后退功能
    * 用法是 `git revert a` ，a是一个版本号
    * 会创建一个新的commit（暂称为b）
    * a和b互为相反的diff
    * b仅完全diff版本a，与a和last commit（即b）之间的版本不相关
* git reset 重置/后退功能
    * 用法1：`git reset a`，a是一个版本号，这里假设a是上上个版本。执行git reset之后，git log会发现少了上个版本（即当前版本到a的下一个版本全没有了），但是a版本还在，且文件内容是最新内容，没有做修改
    * 用法2：`git reset HEAD file` 撤销暂存区的修改操作，重新放回工作区(HEAD表示当前位置)
* git reset --hard HEAD^回退到上个版本
    * git reset  --hard HEAD^^回退到上上个版本
    * git reset  --hard HEAD~100 回退到前100个版本
* git branch 查看分支，会列出所有的分支，当前分支前面会添加一个星号
    * git branch name 创建分支name
    * git branch -d name 删除分支name
    * git push --delete origin name 删除远程仓库分支name
    * git branch -a 查看所有本地分支和远程分支
    * git branch -r 只查看远程分支
* git checkout -- file 撤销，丢弃工作区的修改，file是文件名
* git checkout name 切换到name分支上
* git checkout -b name 创建并切换到分支name上，等于`git branch <分支名>`+`git checkout <分支名>`
* git merge name 将指定分支name合并到当前分支上 
* git remote show origin 查看远程仓库的详细信息
    * git remote -v 查看远程仓库名和地址(show remote url after name)
* --help参数，可以寻求帮助

## 常用远程操作命令

* 本地没有仓库，远程没有相应的仓库，用 git init     
* 本地没有仓库，远程有仓库，从远程同步到本地，用clone。git clone 远程仓库地址
* 本地有仓库，远程没有仓库，用push。在github上新建一个仓库，获取仓库地址
* 已有本地仓库，同步到远程仓库，从本地仓库同步到远程仓库，用push。git push origin master
* 本地已有仓库，远程仓库有更新，从远程仓库同步到本地仓库，用pull。git pull origin master

## 解决冲突conflict

            av1
         /      \
        a         av3
         \      /
           av2

av1和av2都是a文档的fast-forward，av3是av1和av2的fast-forward，所以在av3处可能会发生conflict。假设是av1处的操作使得发生conflict，那么av1文档的内容会发生变化：      

1. <<<<<<<到========之间是av1中与av2相冲突的内容；
2. =======到>>>>>>>>之间是av2中与av1相冲突的内容；
3. 修改av1文档，删掉符号，保留想保留的文档内容；
4. 修改好后，add + commit ;
5. 冲突已解决；
6. 发生冲突的原因不同，但解决办法大同小异。

## git add -A 和 git add . 和 git add -u 的区别

都是提交内容到暂存区   

* -A相当于all，提交被修改、被删除、被新建的文件；
* . 提交被修改、被新建，不提交被删除的文件；
* -u想当于update，提交被修改、被删除，不提交被新建的文件。

## 设置和查询git缩写

### 设置

```
$ git config --global alias.co checkout

```
--global参数是全局参数，也就是这些命令在这台电脑的所有Git仓库下都有用。

### 查看

* 每个仓库的git配置文件都放在.git/config文件中
* 当前用户的git配置文件放在用户主目录下的一个隐藏文件.gitconfig中
   
查看某个仓库的git缩写

```
$ cat .git/config

```

运行结果

```
[core]
       repositoryformatversion = 0
       filemode = false
       bare = false
       logallrefupdates = true
       symlinks = false
       ignorecase = true
[branch "master"]
[remote "origin"]
       url = git@github.com:giselle527/giselle527.github.io.git
       fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
       remote = origin
       merge = refs/heads/master
[alias]
       co = checkout

```

查看global（适用这台电脑所有仓库）的git缩写

```
$ cat ~/.gitconfig

```

运行结果

```
[user]
       email = drinkjch@163.com
       name = giselle527
[alias]
       st = status
       br = branch
       ci = commit
       co = checkout
[core]
       autocrlf = true
[filter "lfs"]
       smudge = git-lfs smudge -- %f
       process = git-lfs filter-process
       required = true
       clean = git-lfs clean -- %f

```

1. 别名就在[alias]后面，如果没有[alias]，说明没有设置；       
2. 要删除别名，直接找到文件把对应的行删掉即可。

## upstream、当前分支、远程分支等知识

### 设置upstream的主要好处   

1.将本地的branch和远程仓库的branch对应起来，即本地分支和远程分支建立跟踪关系；      
2.可以简化git命令，比如git pull和git push时可以省略分支名称，git自动识别跟踪关系并将代码更新同步到本地或者远程分支。

### 将当前分支与远程分支对应起来的命令 

`git push --set-upstream origin jnshu` 或 `git push -u origin jnshu` ，-u 是 --set-upstream 的简写。

### 查看当前branch和远程跟踪分支的区别的命令

会显示版本号，和对应的commit文字内容：`git branch -vv`

### remote/origin/address

* address是一个远程仓库地址，例：https://github.com/xxx/oo.git
* origin是一个远程仓库地址的代号
* remote是远程仓库地址代号的集合

## 将bash默认的vim编辑器改成sublime

```
$ git config --global core.editor "D:/Program\ Files/Sublime\ Text\ 3/sublime_text.exe -w"

```
   
注意事项：        
1. window下路径的斜杠是\这样的，git-bash里的斜杠是/这样的；
2. 空格在git-bash里有特殊意义，需要用\转义；
3. sublime是异步软件，git-bash是同步软件，为了让sublime适配git-bash，需要在末尾加-w
4. 命令还可以写作：    
$ git config --global core.editor "'D:/Program Files/Sublime Text 3/sublime_text.exe' -w"


## git log --graph --decorate --stat

简版加--oneline命令：`git log --graph --oneline --decorate`

### --graph

```

* 
|\
| * 
| * 
* | 
|/
* 
* 

```

### --decorate

origin/jnshu, jnshu

### --stat

```

README.md    |  8 ++++++++
index.html   | 26 --------------------------
mytask0.html | 43 -------------------------------------------
test.html    | 11 -----------
4 files changed, 8 insertions(+), 80 deletions(-)

```

## [删除本地仓库和远程仓库](http://blog.csdn.net/pruett/article/details/72600004)

### 删除本地仓库

1. 查看该仓库下的所有分支：$ git branch # 删掉分支
2. 执行git init命令：$ git init
3. 在本地目录下找到.git文件：$ ls -a
4. 删除.git文件夹：$ rm -rf .git
5. 删除本地仓库目录：$ rm -rf 目录名

### 删除远程仓库

在gitHub对应的仓库的settings里删除远程仓库
