const User = require("./../datamodel");



exports.signin = async (ctx,next)=>{
    ctx.body = '登录';
    
}
exports.signout = async (ctx,name)=>{
	ctx.body = '退出登录'
}
exports.register = async (ctx,name)=>{
	const user = new User({name:"狗狗"});
	user.save((err,user)=>{
		if(err) return console.log(err);
	})
	ctx.body = {
        title: '注册'
      }
}
exports.retrievepassword = async (ctx,name)=>{
	ctx.body = {
        title: '找回密码'
      }
}