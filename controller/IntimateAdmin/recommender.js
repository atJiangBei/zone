const {
	RecommenderSchema
} = require("./../../datamodel");
const {
	createRandomStr,
	removeUndefined
} = require('./../../common')
exports.addRecommender = async (ctx, next) => {
	const {
		name
	} = ctx.query
	try {
		const data = await RecommenderSchema.find({
			name
		})
		console.log(data)
		if (data.length) {
			ctx.body = {
				state: 3,
				message: "不能重复添加推荐人"
			}
			return
		} else {
			await new RecommenderSchema({
				name,
				key: createRandomStr(),
				CreatedDate: Date.now() + ''
			}).save()
			ctx.body = {
				state: 1,
				message: "新增推荐人成功"
			}
		}
	} catch (e) {
		ctx.body = {
			state: 0,
			message: e
		}
	}

}

exports.queryRecommender = async (ctx, next) => {
	let query = ctx.query
	console.log(query)
	query = removeUndefined(query)
	const pageQuery = JSON.parse(query.query)
	delete query.query
	try {
		const data = await RecommenderSchema.paginate({ ...query
		}, { ...pageQuery
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


exports.deleteRecommender = async (ctx, next) => {
	try {
		const {
			key
		} = ctx.query
		const result = await RecommenderSchema.deleteOne({
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
