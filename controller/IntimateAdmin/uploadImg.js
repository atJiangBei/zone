

exports.uploadImg = async (ctx,next)=>{
	ctx.body = '上传图片!'
}


exports.deleteImg = async (ctx,next)=>{
	ctx.body = {
		  state:1,
		  data:"删除图片"
	}
}



