let {dbUrl} = require('./config.js')
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);//将session存到数据库所用的连接插件



//消息提示中间件
let flash = require('connect-flash');
let app = express();

//本次开发不使用views templete.将使用前后端分离的方式；
app.set('view engine','html'); //设置模板引擎 html
app.set('views',path.resolve('views')); //指定模板的存放根路径
app.engine('html',require('ejs').__express) //指定对于HTML类型的模板使用ejs方法来进行渲染
app.use(express.static(path.resolve('node_modules'))) //指定静态文件中间件可以直接使用node_modules下的文件
app.use(express.static(path.resolve('public'))) 
// /bootstrap/...
// 此静态文件中间件会拦截到客户端对于静态文件的请求，然后会在当前目录的node_modules目录下寻找到文件，如果能找到就返回到客户端结束请求
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))//一定要在路由的上面用；
//在使用了此绘画中间件之后，会在请求对象上增加req.session属性
app.use(session({
  resave:true,//每次客户端请求到服务器都会保存到session
  secret:'zfpx',//用来加密cookie
  saveUninitialized:true,//保存未初始化的session
  cookie:{
    maxAge:3600*1000 //指定cookie的过期时间
  },
  store:new MongoStore({
    url:dbUrl
  })
}))
//切记此中间件的使用要放到session的后面,此中间件是需要依赖session的；
//依赖session的req.flash(type,msg)赋值 req.flash(type)取值
app.use(flash())
app.use(function(req,res,next){
  //正在渲染模板的是res.locals,res.locals.user给模板添加user变量
  res.locals.user = req.session.user;
  res.locals.keyword ='';
  //flash的功能是读完一次后立刻清空数据
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next()
})
let index = require('./routes/index');
let user = require('./routes/user');
let article = require('./routes/article');
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