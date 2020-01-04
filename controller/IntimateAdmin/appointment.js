//预约订单

const {
	AppointmentSchema,
	CommoditySchema
} = require("./../../datamodel");
const {
	createRandomStr,
	removeUndefined
} = require('./../../common')

exports.addAppointment = async (ctx,next)=>{
	const {
		user_name,
		user_openid,
		commodity,
		recommender,
		details,
	} = ctx.query
	try{
		await new AppointmentSchema({
			name:user_name,
			openid:user_openid,
			commodity,
			details,
			recommender:recommender,
			key: createRandomStr(),
			CreatedDate: Date.now() + ''
		}).save()
		ctx.body = {
			state:1,
			data:{}
		}
	}catch(e){
		ctx.body = {
			state:0,
			message:e.toString()
		}
	}
	
}
exports.queryAppointment = async (ctx,next)=>{
	
}
exports.deleteAppointment = async (ctx,next)=>{
	
}


//1296db