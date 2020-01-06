//预约订单

const {
	AppointmentSchema,
	CommoditySchema
} = require("./../../datamodel");
const {
	createRandomStr,
	analysis
} = require('./../../common')

exports.addAppointment = async (ctx, next) => {
	const {
		name,
		user_name,
		user_openid,
		commodity,
		recommender,
		details,
	} = ctx.query
	try {
		await new AppointmentSchema({
			name: name,
			user_name: user_name,
			openid: user_openid,
			commodity,
			details,
			recommender: recommender,
			key: createRandomStr(),
			CreatedDate: Date.now() + ''
		}).save()
		let {
			SalesVolume,
			key
		} = JSON.parse(commodity)
		await CommoditySchema.findOne({
			key
		}).updateOne({
			SalesVolume: ++SalesVolume
		}).exec();
		ctx.body = {
			state: 1,
			data: {}
		}
	} catch (e) {
		ctx.body = {
			state: 0,
			message: e.toString()
		}
	}

}
exports.queryAppointment = async (ctx, next) => {
	const {
		queryPaging,
		queryParams
	} = analysis(ctx.query)
	try {
		const data = await AppointmentSchema.paginate({...queryParams
		}, {
			...queryPaging,
			sort: {
				CreatedDate: -1
			}
		})

		ctx.body = {
			state: 1,
			data: data
		}
	} catch (e) {
		ctx.body = {
			state: 0,
			e: e.toString()
		}
	}
}
exports.deleteAppointment = async (ctx, next) => {
	try {
		const {
			key
		} = ctx.query
		const result = await AppointmentSchema.deleteOne({
			key
		})
		console.log(result)
		const {
			ok
		} = result
		if (ok === 1) {
			ctx.body = {
				state: 1,
				message: '删除成功'
			}
		} else {
			ctx.body = {
				state: 0,
				message: '未知错误'
			}
		}
	} catch (e) {
		ctx.body = {
			state: 0,
			message: e.toString()
		}
	}
}


//1296db
