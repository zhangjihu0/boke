let express = require('express');
let {Article} =require('../model');
let router = express.Router();
// /article/add
router.get('/add',function(req,res){
  res.render('article/add',{title:'发表文章',article:{}})
//  res.send('发表文章')
});
router.post('/add',function(req,res){
  let article = req.body;
  article.user = req.session.user._id;
  console.log("12",req.session)
  Article.create(article,function(err,doc){
    if(err){
        req.flash('error','添加文章失败')
        res.redirect('back')
    }else{
      req.flash('success','添加文章成功')
      res.redirect('/article/add')
    }
  }) 
//  res.send('发表文章')
});
router.get('/detail/:_id',function(req,res){
  //params获取路径参数_id
  console.log('params',req.params)
  let _id = req.params._id
  Article.findById(_id,function(err,article){
    if(err){
      req.flash('error',err);
      res.redirect('back');
    }else{
      res.render('article/detail',{title:'文章详情',article})
    }
  })
})
router.get('/delete/:_id',function(req,res){
  let _id = req.params._id
  Article.remove({_id},function(err,article){
    if(err){
     req.flash('error',err);
     res.redirect('back');
    }else{
       req.flash('sucess','删除成功');
      res.redirect('/');
    }
  })
})
//当点击更新按钮的时候会请求此路径
router.get('/update/:_id',function(req,res){
  let _id = req.params._id;//先获得路径里的文章ID
  Article.findById(_id,function(err,article){
    //增加和更新可以复用一个模板
    res.render('article/add',{title:'更新文章',article})
  })
})
//update只会更新传入的同名属性，为传入的值，不会更新
router.post('/update/:_id',function(req,res){
  let _id = req.params._id;//先获得路径里的文章ID
  Article.update({_id},req.body,function(err,article){
    //增加和更新可以复用一个模板
    if(err){
      req.flash('error',err);
      res.redirect('back')
    }else{
      req.flash('sucess','文章更新成功')
      res.render('article/detail/'+_id)
    }
   
  })
})
// module model
module.exports = router;