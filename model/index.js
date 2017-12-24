let mongoose = require('mongoose');
let {dbUrl} = require('../config.js');
mongoose.Promise = Promise;
let ObjectId = mongoose.Schema.Types.ObjectId;
//连接数据库
mongoose.connect(dbUrl);
//定义用户集合的骨架模型，规定用户集合中文档的属性和类型
let UserSchema = new mongoose.Schema({
  username:String,
  password:String,
  email:String,
  avatar:String
})
//定义用户模型
let User = mongoose.model('User',UserSchema);
//并把用户模型挂载到导出对象上
exports.User = User; 


let ArticleSchema  = new mongoose.Schema({
  title:String,
  content:String,
  createAt:{
    type:Date,
    default:Date.now
  },
  user:{
    type:ObjectId,
    ref:'User'
  }

})
let Article = mongoose.model('Article',ArticleSchema)
exports.Article = Article