const {
	UploadImgSchema
} = require("./../../datamodel");
const {
	createRandomStr,
	removeUndefined
} = require('./../../common')
const isLinux = process.platform === 'linux'

exports.uploadImg = async (ctx, next) => {
	if (ctx.req && ctx.req.file) {
		try{
			const name = ctx.req.file.filename
			let url = 'http://127.0.0.1/uploadimgs/' + name;
			if (isLinux) {
				url = 'http://index.jiangbei.online/imgs/' + name;
			}
			await new UploadImgSchema({
				name,
				url,
				key: createRandomStr(),
				CreatedDate: Date.now() + ''
			}).save()
			ctx.body = {
				state: 1,
				data: {
					url: url
				},
				message: '上传图片!'
			}
		}catch(e){
			ctx.body = {
				state: 0,
				message: e.toString()
			}
		}
		
	} else {
		ctx.body = {
			state: 0,
			message: '上传失败'
		}
	}

}

exports.queryImg = async (ctx, next) => {
	const query = removeUndefined(ctx.query)
	const pageQuery = JSON.parse(query.query)
	delete query.query
	try {
		const data = await UploadImgSchema.paginate({
			...query
		}, {
			...pageQuery,
			sort: {
				date: 1
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

exports.deleteImg = async (ctx, next) => {
	ctx.body = {
		state: 1,
		data: "删除图片"
	}
}

//root@47.244.40.130:22:/etc/nginx/nginx.conf
