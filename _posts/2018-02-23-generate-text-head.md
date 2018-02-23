---
layout: post
title: "自动生成jekyll文本头"
description: 在本地新建blog文档，修改文档后缀名为.md，为文本加上yml语法开头。
categories: [jekyll]
tags: [blog, yml语法]
---

可以使用Rake工具来实现自动生成jekyll文本头。

### Rake工具

Rake，即Ruby Make, 使用ruby开发的代码构建工具。

### 查看Rake是否已经安装

```
gem list rake

```

### 安装Rake工具

```
gem install rake

```

### 编写Rakefile

Rakefile文件要放入jekyll的根目录下，内容如下：

```

require 'rake'
require 'yaml'

SOURCE = "."
CONFIG = {
  'posts' => File.join(SOURCE, "_posts"),
  'post_ext' => "md",
}

# Usage: rake post title="A Title"
desc "Begin a new post in #{CONFIG['posts']}"
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV["title"] || "new-post"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  filename = File.join(CONFIG['posts'], "#{Time.now.strftime('%Y-%m-%d')}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts "description: "
    post.puts "categories: []"
    post.puts "tags: []"
    post.puts "---"
  end
end # task :post


```

* 新建txt文档，将代码粘进去，另存时选择所有文档，名字改为Rakefile
* 如果去不掉文件名上的`.txt`，右键打开属性，在常规页面去掉`.txt`

### 输入新建文档命令

```
rake post title="article name"

```

命令行输入命令后，会在_post创建`年-月-日-article-name.md`文档。

