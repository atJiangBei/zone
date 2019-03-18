const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/myself';
mongoose.connect(DB_URL)
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name:  String,
	password: String,
	SecretProtection:   String,//密保问题
	PersonalizedSignature: String,//个性签名
	PersonalStatement:String,//个人说明
	CreatedDate: { type: Date, default: Date.now },//账户创建时间
});

const User = mongoose.model('User', userSchema);

module.exports = User;