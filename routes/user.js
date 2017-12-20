let express = require('express')
let router = express.Router();
let {User} = require('../model');
/**
 * 注册功能实现
 * 1.绘制注册页面模板
 * 2.实现提交用户注册路由 post /user/signup
 * 3.在路由中要获得请求体，然后把此用户信息保存到数据库中
 * 4.保存完毕后跳转到登录页面
 */
router.get('/signup',function(req,res){
  res.render('user/signup',{title:'注册'})
})
router.post('/signup',function(req,res){
  let user = req.body;//请求对象(username,password)
  // res.render('user/signup',{title:'注册'})
  //err:错误对象
  //doc:保存成功后的user对象
  User.create(user,function(err,doc){//_id
    if(err){
      res.redirect('back')
    }else{

      res.redirect('/user/signin')
    }
  })
})
router.get('/signin',function(req,res){
  res.render('user/signin',{title:'登录'})
})
router.post('/signin',function(req,res){
 let user = req.body;
 User.findOne({username:'jihu'},{username:1,_id:0},function(err,doc){//未找到返回null
  if(err){
    res.redirect('back')
  }else{
    console.log('37',doc)
    if(doc){
      res.redirect('/')
    }else{
      res.redirect('back')
    }
  }
 })
})
router.get('/signout',function(req,res){
  res.render('user/signout',{title:'退出'})
})
module.exports = router;