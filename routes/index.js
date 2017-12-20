let express = require('express');
//调用Route方法可以得到一个路由中间件实例
let router = express.Router();//大写函数
//当客户端通过get请求的方式访问 /路径的时候，会交给由对应的函数来处理
router.get('/',function(req,res){
    //路由是相对路径相对于模板目录的根路径 
    res.render('index',{title:"Tigger's boke home"})
    // res.send('首页');

});
module.exports = router;//导出