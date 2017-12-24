let express = require('express')
let router = express.Router();
let {User} = require('../model');
let {checkNotLogin,checkLogin}  = require('../auth.js')
let multer = require('multer');
let uploads = multer({dest:'./public/uploads'})
//checkNotLogin 登录后不能访问
// checkLogin 未登录不能访问
/**
 * 注册功能实现
 * 1.绘制注册页面模板
 * 2.实现提交用户注册路由 post /user/signup
 * 3.在路由中要获得请求体，然后把此用户信息保存到数据库中
 * 4.保存完毕后跳转到登录页面
 */
router.get('/signup',checkNotLogin,function(req,res){
  res.render('user/signup',{title:'注册'})
})
//single 当表单里只有一个上传字段的话 avatar是上传文件字段的name 属性 req.file req.body
router.post('/signup',uploads.single('avatar'),function(req,res){
  let user = req.body;//请求对象(username,password)
  // res.render('user/signup',{title:'注册'})
  //err:错误对象
  //doc:保存成功后的user对象
  
  user.avatar = "/uploads/"+req.file.filename

  User.findOne(user,function(err,doc){
    if(err){
      req.flash('error','用户注册失败')
      res.redirect('back')
    }else{
      if(doc){
        req.flash('error','用户已被注册')
        res.redirect('back')
      }else{
        User.create(user,function(err,doc){//_id
          if(err){//表示注册失败 类型error，内容是注册失败
            req.flash('error','用户注册失败')
            res.redirect('back')
          }else{
            req.flash('success','用户注册成功')
            res.redirect('/user/signin')
          }
        })
      }
    }

  })

})
router.get('/signin',checkNotLogin,function(req,res){
  res.render('user/signin',{title:'登录'})
})
router.post('/signin',checkNotLogin,function(req,res){
 let user = req.body;
 User.findOne(user,function(err,doc){//未找到返回null
  if(err){
    req.flash('error','用户登录失败')
    res.redirect('back')
  }else{
    if(doc){
      //向会话对象中写入属性 user = doc
      req.flash('success','用户登录成功')
      console.log(doc)
      req.session.user = doc
      res.redirect('/')
    }else{
      req.flash('success','未找到用户')
      res.redirect('back')
    }
  }
 })
})
router.get('/signout',checkLogin,function(req,res){
  req.session.user = null;
  res.render('user/signout',{title:'退出'})
})
module.exports = router;
/**
 * req.file = { fieldname:'avatar', 上传字段的名称
 *  originalname:'1.jpg', 上传钱的原始文件名
 *  encoding:'7bit',
 *  mimetype:'image/jpeg',文件类型
 *  destination:'public/uploads',存放位置在在服务器上
 *  filename:'...',在服务器上的文件名称
 *  path:'public\\uploads\\cc...',
 *  size:129931}文件体积
 * req.body = {
 *  username:'1234',
 *  passworld:'1234',
 *  email:'1@1.com'
 * }
 *  
 * 
 *    
 * }
 */