## 新建一个项目
```
yarn init -y
```
## 安装依赖的模块
```
yarn add body-parser cookie-parser debug ejs express morgan express-session serve-favicon connect-mongoose connect-flash multer async 
```
## git
### 创建README.md文件并添加内容
### 创建gitignore文件 
1.  添加忽略文件>>node_modules
### 命令行初始化git
1. git init
2. git add -A
3. git commit -m '初始化项目和依赖'
### github上创建项目
```
  echo "# boke" >> README.md
  git init
  git add README.md
  git commit -m "first commit"
  git remote add origin https://github.com/zhangjihu0/boke.git
  git push -u origin master
```
1. 创建空项目
2. git remote add origin https://github.com/zhangjihu0/boke.git
3. git push -u origin master

## 创建服务
  express+mongodb
```
  let express = require('express');
  let app = express();

  app.listen(8080);
```
### 跑通路由

#### 功能分析设计路由

### 引入模板引擎
