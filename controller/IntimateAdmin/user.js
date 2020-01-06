const {
	User
} = require("./../../datamodel");
const code = "wszxxsjhjzyq"


exports.signin = async (ctx, next) => {
	const {
		name,
		password
	} = ctx.request.body;
	console.log(name)
	const data = await User.find({
		name
	});
	if (data.length === 0) {
		ctx.body = {
			state: 2,
			message: "此用户名未注册"
		}
		return;
	} else {
		let message = "";
		if (data[0].password === password) {
			ctx.body = {
				state: 1,
				message: "登录成功"
			}
			let n = ctx.session.views || 0;
			ctx.session.name = name;
			ctx.session.password = password;
		} else {
			ctx.body = {
				state: 2,
				message: "密码错误"
			}
		}

	}
}



exports.signout = async (ctx, next) => {
	ctx.body = '退出登录'
}
exports.register = async (ctx, next) => {
	const {
		name,
		RegistrationCode,
		password,
	} = ctx.request.body;
	if (RegistrationCode !== code) {
		ctx.body = {
			state: 2,
			message: "注册码错误"
		}
		return;
	}
	const data = await User.find({
		name
	});
	if (data.length > 0) {
		ctx.body = {
			state: 2,
			message: "用户名已被注册，请重新输入"
		}
		return;
	}


	const user = new User({
		name,
		password,
	});
	try {
		await user.save()
		ctx.body = {
			state: 1,
			message: "恭喜您！注册成功"
		}
	} catch (e) {
		console.warn(e)
		ctx.body = {
			state: 2,
			message: "网络错误，请重试"
		}
	}


}
exports.retrievepassword = async (ctx, next) => {
	ctx.body = {
		title: '找回密码',
	}
}

exports.loginStatus = async (ctx, next) => {
	const session = ctx.session;
	if (session.name) {
		let data = await User.findOne({
			name: session.name
		}, {
			name: 1,
			_id: 1,
			CreatedDate: 1,
			headPortrait:1
		});
		ctx.body = {
			state: 1,
			data: data
		}
	} else {
		ctx.body = {
			state: 2,
			message: "登录状态已过期，请重新登录"
		}
	}

}
