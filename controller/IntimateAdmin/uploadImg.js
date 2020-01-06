const fs = require('fs')
const path = require('path')
const {
	UploadImgSchema
} = require("./../../datamodel");
const {
	createRandomStr,
	removeUndefined
} = require('./../../common')
const isLinux = process.platform === 'linux'
let prefix = 'http://127.0.0.1:3000/uploadimgs/';
if (isLinux) {
	prefix = 'http://static.jiangbei.online/imgs/';
}
let pathUrl = function(){
	if(isLinux){
		return path.join(__dirname,'../../../../assets/imgs/')
	}else{
		return path.join(__dirname,'../../public/uploadimgs/')
	}
}
exports.uploadImg = async (ctx, next) => {
	if (ctx.req && ctx.req.file) {
		try {
			const name = ctx.req.file.filename
			const url = prefix + name;
			const key = createRandomStr()
			await new UploadImgSchema({
				name,
				url,
				key: key,
				CreatedDate: Date.now() + ''
			}).save()
			ctx.body = {
				state: 1,
				data: {
					url: url,
					name:name,
					key:key
				},
				message: '上传图片!'
			}
		} catch (e) {
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

exports.deleteImg = async (ctx, next) => {
	const {
		key,
		name
	} = ctx.query
	const link = pathUrl() + name
	try{
		const result = await UploadImgSchema.deleteOne({
			key
		})
		const {
			ok
		} = result
		fs.unlinkSync(link)
		ctx.body = {
			state: 1,
			message: '删除成功'
		}
	}catch(e){
		ctx.body = {
			state: 0,
			message: e.toString()
		}
	}
	
}

//root@47.244.40.130:22:/etc/nginx/nginx.conf
