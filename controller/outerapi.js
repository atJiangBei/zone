const User = require("./../datamodel");



exports.signin = async (ctx,next)=>{
    const {name,password} = ctx.request.body;
    console.log(name)
    const data = await User.find({name});
    if(data.length===0){
    	ctx.body = {
	    	state:2,
	    	message:"此用户名未注册"
	    }
    	return;
    }else{
    	let message = "";
    	if(data[0].password===password){
    		ctx.body = {state:1,message:"登录成功"}
    		let n = ctx.session.views || 0;
	  		ctx.session.name = name;
			ctx.session.password = password;
    	}else{
    		ctx.body = {state:1,message:"密码错误"}
    	}
    	
    }
}



exports.signout = async (ctx,next)=>{
	ctx.body = '退出登录'
}
exports.register = async (ctx,next)=>{
	const {name,SecretProtection,password} = ctx.request.body;
	
	const data = await User.find({name});
	console.log(data)
	if(data.length>0){
		ctx.body = {
		    state:2,
		    message:"用户名已被注册，请重新输入"
		  }
		return;
	}
	const dataProtection = await User.find({SecretProtection});
	console.log(dataProtection)
	if(dataProtection.length>0){
		ctx.body = {
		    state:2,
		    message:"密保重复，请重新输入"
		  }
		return;
	}
	const user = new User({name,SecretProtection,password});
	try{
		await user.save()
		ctx.body = {
	        state:1,
		    message:"恭喜您！注册成功"
	      }
	}catch(e){
		console.warn(e)
		ctx.body = {
	        state:2,
		    message:"网络错误，请重试"
	      }
	}
		
	
}
exports.retrievepassword = async (ctx,next)=>{
	ctx.body = {
	        title: '找回密码',
	      }
}