let express = require('express');
let {Article} = require('../model')
//调用Route方法可以得到一个路由中间件实例
let router = express.Router();//大写函数
//当客户端通过get请求的方式访问 /路径的时候，会交给由对应的函数来处理
router.get('/',function(req,res){
    let {keyword,pageNum,pageSize} = req.query
    pageNum = isNaN(pageNum)?1:parseInt(pageNum);
    pageSize = isNaN(pageSize)?3:parseInt(pageSize);
    let query = {}
    if(keyword){
        query.title = new RegExp(keyword);// /b/
        query["$or"] =[{title:new RegExp(keyword)},{content:new RegExp(keyword)}]//两个中的任意一个;
    }
    //路由是相对路径相对于模板目录的根路径 
    //populate(user)表关联下不转化user会是string populate后会是对象
    Article.count(query,function(err,count){//总条数
        Article.find(query).sort({createAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function(err,article){
            res.render('index',{
                title:"Tigger's boke home",
                article,
                keyword,
                pageNum,//当前页
                pageSize,//每页条数
                totalPages:Math.ceil(count/pageSize)//总页数
            })
        })
    })

    // res.send('首页');
});
module.exports = router;//导出