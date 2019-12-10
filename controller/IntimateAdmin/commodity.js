const {
	CommoditySchema
} = require("./../../datamodel");
const {
	createRandomStr,
	removeUndefined
} = require('./../../common')


exports.addCommodity = async (ctx, next) => {
	const {
		name,
		banner,
		price,
		sellingPoint,
		details
	} = ctx.request.body;
	console.log(name)
	try {
		const data = await CommoditySchema.find({
			name
		});
		if (!data.length) {
			await new CommoditySchema({
				name,
				banner,
				price,
				sellingPoint,
				details,
				key: createRandomStr(),
				CreatedDate: Date.now() + ''
			}).save()
			ctx.body = {
				state: 1,
				data: [],
				message: 'ok!'
			}
		} else {
			console.log(data)
			ctx.body = {
				state: 3,
				message: '商品名称不能重复!'
			}
		}
	} catch (e) {
		ctx.body = {
			state: 0,
			message: e.toString()
		}
	}

}

exports.queryCommodity = async (ctx, next) => {

	const {
		name,
		query = {}
	} = ctx.query

	try {
		const data = await CommoditySchema.paginate({
			...removeUndefined({
				name
			})
		}, {
			...query
		});
		ctx.body = {
			state: 1,
			data
		}

	} catch (e) {
		ctx.body = {
			state: 0,
			message: e.toString()
		}
	}
}


exports.deleteCommodity = async (ctx, next) => {
	ctx.body = {
		state: 1,
		data: "删除商品"
	}
}
