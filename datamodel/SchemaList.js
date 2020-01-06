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
	headPortrait:String,//头像
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
	CreatedDate: String //账户创建时间字符戳
});

RecommenderSchema.plugin(mongoosePaginate)

const CommoditySchema = new Schema({
	name: String,
	banner: String,
	price: Number,
	sellingPoint: String,
	type:String,
	SalesVolume:{
		type:String,
		default:0
	},
	details: String,
	key: String, //
	CreatedDate: String //商品添加时间
});

CommoditySchema.plugin(mongoosePaginate)

const UploadImgSchema = new Schema({
	name: String,
	url: String,
	key: String, 
	CreatedDate: String 
})

UploadImgSchema.plugin(mongoosePaginate)

const AppointmentSchema = new Schema({
	//预约订单记录
	name: String,//预约用户名
	user_name:String,//预约用户微信名
	openid: String,//预约用户openid
	recommender:String,//推荐人
	key: String, //订单号
	commodity:{},//商品信息
	details:{},//订单详情
	CreatedDate: String //订单生成时间
})

AppointmentSchema.plugin(mongoosePaginate)

exports.userSchema = userSchema;
// 推荐人
exports.RecommenderSchema = RecommenderSchema;
//商品
exports.CommoditySchema = CommoditySchema
// 图片上传
exports.UploadImgSchema = UploadImgSchema
//预约 订单
exports.AppointmentSchema = AppointmentSchema
