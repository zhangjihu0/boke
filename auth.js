//进入路由之前要求此路由未登录，如果已登录则跳回首页提示已经登录；
exports.checkNotLogin = function(req,res,next){
  if(req.session.user){
    res.redirect('/');
  }else{
    next()
  }
}
//如果要求此路由登陆后才能访问，则会判断当前的登录状态，如果已登录，则正常继续访问，如果未登录则跳回首页
exports.checkLogin = function(req,res,next){
  if(req.session.user){
    next();
  }else{
    res.redirect('/')
  }
}