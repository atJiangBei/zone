const { Schema } = require('mongoose');

const userSchema = new Schema({
	name:  String,
	password: String,
	SecretProtection:   String,//密保问题
	PersonalizedSignature: String,//个性签名
	PersonalStatement:String,//个人说明
	CreatedDate: { type: Date, default: Date.now },//账户创建时间
});


exports.userSchema = userSchema;