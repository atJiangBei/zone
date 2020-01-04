const http = require('https')
const request = require('superagent')
const querystring = require('querystring');
const router = require('koa-router')()
const appid = "wx024ae6be4193c1fc";
const secret = "1b5a188b26d45b01e9891d869d1a89d6";
const sha1 = require('sha1');
//const { AppSecret,AppID} = require('./../../utils/config.js')
const get = (url) => {
	return new Promise((resolve, rej) => {
		http.get(url, function(res) {
			res.on('data', (d) => {
				const data = d.toString();
				if (data.errmsg) {
					rej(data.errmsg)
				} else {
					resolve(data)
				}
			});
		}).on('error', (e) => {
			console.error(e);
			rej(e)
		});
	})
}
let urlAccessToken = "";
urlAccessToken = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" +
	secret;


router.get('/IntimateAdmin/getToken', async (ctx, next) => {
	try {
		let tokenData = await get(urlAccessToken);
		tokenData = JSON.parse(tokenData);
		if (tokenData.errcode) {
			ctx.body = {
				state: 0,
				message: tokenData.errmsg
			}
		} else {
			ctx.body = {
				state: 1,
				data: tokenData,
				message: "登录成功"
			}
		}
	} catch (e) {
		ctx.body = {
			state: 0,
			message: e.toString()
		}
	}
})

router.get('/IntimateAdmin/getOpenid', async (ctx, next) => {
	const {
		code
	} = ctx.query
	try {
		let urlOpenidSessionkey = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret +
			"&js_code=" + code +
			"&grant_type=authorization_code";
		let data = await get(urlOpenidSessionkey);
		data = JSON.parse(data);
		if (data.errcode) {
			ctx.body = {
				state: 0,
				message: data.errmsg
			}
		} else {
			ctx.body = {
				state: 1,
				data: data,
				message: "登录成功"
			}
		}
	} catch (e) {
		ctx.body = {
			state: 0,
			data: e.toString()
		}
	}
})

router.get('/IntimateAdmin/login', async (ctx, next) => {
	const {
		code
	} = ctx.query
	let urlOpenidSessionkey = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret +
		"&js_code=" + code +
		"&grant_type=authorization_code";
	try {
		const data = await get(urlOpenidSessionkey)
		const tokenData = await get(urlAccessToken)

		const newData = Object.assign({}, JSON.parse(data), JSON.parse(tokenData))
		//console.log(newData)
		ctx.body = {
			state: 1,
			data: newData,
			message: "登录成功"
		}
	} catch (e) {
		ctx.body = {
			state: 0,
			message: "登录失败"
		}
	}
})

router.get('/IntimateAdmin/sendMessage', async (ctx, next) => {
	const {
		access_token,
		openid,
		data,
	} = ctx.query
	let sendUrl = "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=" + access_token;

	try {
		let res = await request
			.post(sendUrl)
			.send({
				touser: openid,
				template_id: 'HWIv-fEMymRtTF__AjP31sWuKilWU4GnDWvCAlrXoTg',
				data: JSON.parse(data)
			})
			.set('Accept', 'application/json')
		res = JSON.parse(res.text)
		if (res.errcode === 0) {
			ctx.body = {
				state: 1,
				message: "推送成功"
			}
		} else {
			ctx.body = {
				state: 0,
				message: res.errmsg
			}
		}

	} catch (e) {
		console.log(888888888888)
		ctx.body = {
			state: 0,
			message: e.toString()
		}
	}
})
const token = "asdasdfsafdsfdgdfghfdhhdf";
router.get('/IntimateAdmin/checkWx', async (ctx, next) => {

	const {
		signature,
		timestamp,
		nonce,
		echostr
	} = ctx.query;
	const tmpstr = [token, timestamp, nonce].sort().join();

	let sha = sha1(tmpstr);

	if (sha == signature) {
		ctx.body = echostr;
	} else {
		ctx.body = false;
	}
})

module.exports = router
//asdasdfsafdsfdgdfghfdhhdf
// const postdata = querystring.stringify({
// 	touser: 'ssxsacas',
// 	template_id: 'HWIv-fEMymRtTF__AjP31sWuKilWU4GnDWvCAlrXoTg',
// 	data: JSON.parse(data)
// })
// let postreq = http.request(sendUrl, {
// 	//path:sendUrl,
// 	method: 'POST'
// }, (res) => {
// 	res.setEncoding('utf8');
// 	res.on('data', (chunk) => {
// 		console.log(`响应主体: ${chunk}`);
// 	});
// 	res.on('end', () => {
// 		console.log('响应中已无数据');
// 	});
// }).on('error', (e) => {
// 	console.error(81, e);
// });
// console.log(91, {
// 	touser: openid,
// 	template_id: 'HWIv-fEMymRtTF__AjP31sWuKilWU4GnDWvCAlrXoTg',
// 	data: JSON.parse(data)
// })
// postreq.write(postdata);
// postreq.end();
