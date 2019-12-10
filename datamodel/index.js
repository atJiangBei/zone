const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/myself';
const db = mongoose.connect(DB_URL,{useNewUrlParser:true},(err)=>{
	if(err){
		console.log("数据库连接失败")
	}else{
		console.log("数据库连接成功")
	}
});

const { userSchema ,RecommenderSchema,CommoditySchema} = require("./SchemaList");



exports.User = mongoose.model('User', userSchema);
exports.RecommenderSchema = mongoose.model('Recommender', RecommenderSchema);
exports.CommoditySchema = mongoose.model('Commodity', CommoditySchema);