const {
	CommoditySchema
} = require("./../../datamodel");
const {
	createRandomStr,
	analysis
} = require('./../../common')


exports.addCommodity = async (ctx, next) => {
	const {
		name,
		banner,
		price,
		type,
		sellingPoint,
		details
	} = ctx.request.body;
	try {
		const data = await CommoditySchema.find({
			name
		});
		if (!data.length) {
			await new CommoditySchema({
				name,
				banner,
				price,
				type,
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
		queryPaging,
		queryParams
	} = analysis(ctx.query)
	console.log(queryParams)
	try {
		const data = await CommoditySchema.paginate({
			...queryParams
		}, {
			...queryPaging,
			sort: {
				CreatedDate: -1
			}
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
	try {
		const {
			key
		} = ctx.query
		const result = await CommoditySchema.deleteOne({
			key
		})
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
