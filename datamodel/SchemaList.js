const {
	Schema
} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const {
	createRandomStr
} = require('./../common')
const userSchema = new Schema({
	name: String,
	password: String,
	SecretProtection: String, //密保问题
	PersonalizedSignature: String, //个性签名
	PersonalStatement: String, //个人说明
	CreatedDate: {
		type: Date,
		default: Date.now
	}, //账户创建时间
});

const RecommenderSchema = new Schema({
	name: String,
	age: {
		type: Number,
		default: 0
	},
	address: {
		type: String,
		default: 0
	},
	key: String,
	CreatedDate: String//账户创建时间字符戳
});

RecommenderSchema.plugin(mongoosePaginate)

const CommoditySchema = new Schema({
	name: String,
	banner: String,
	price: Number,
	sellingPoint: String,
	details: String,
	key: String,//
	CreatedDate: String//商品添加时间
});

CommoditySchema.plugin(mongoosePaginate)

exports.userSchema = userSchema;
exports.RecommenderSchema = RecommenderSchema;
exports.CommoditySchema = CommoditySchema