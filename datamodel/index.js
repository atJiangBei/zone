const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/myself';
const db = mongoose.connect(DB_URL,{useNewUrlParser:true});
/*db.on("error",function(){
	console.log("数据库连接失败")
})
db.on("open",function(){
	console.log("数据库连接成功")
})*/
const { userSchema } = require("./SchemaList");

const User = mongoose.model('User', userSchema);

module.exports = User;