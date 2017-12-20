let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
let index = require('./routes/index');
let user = require('./routes/user');
let article = require('./routes/article');
//本次开发不使用views templete.将使用前后端分离的方式；
app.set('view engine','html'); //设置模板引擎 html
app.set('views',path.resolve('views')); //指定模板的存放根路径
app.engine('html',require('ejs').__express) //指定对于HTML类型的模板使用ejs方法来进行渲染
app.use(express.static(path.resolve('node_modules'))) //指定静态文件中间件可以直接使用node_modules下的文件
// /bootstrap/...
// 此静态文件中间件会拦截到客户端对于静态文件的请求，然后会在当前目录的node_modules目录下寻找到文件，如果能找到就返回到客户端结束请求
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',index);//使用中间件
/**
 * /首页
 * /user/signup 注册
 * /user/signin 登录
 * /user/signout 退出
 * /article/add 发表文章
 * 
 */
app.use('/user/',user);//当客户端请求过来的路径是/user开头的话,会交由user中间件来处理/user/signup
app.use('/article/',article);
// 解析客户端提交过来的请求体，并转化成对象付给req.body

app.listen(8089);
// let server = require('http').createServer(app);
// server.listen(8080)