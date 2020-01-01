const http = require('https')
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


// http.get(url,function(res){
// 	res.on('data', (d) => {
// 		console.log(d.toString())
// 	  });
// }).on('error', (e) => {
//   console.error(e);
// });

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
			message: "登录成功"
		}
	}
})

router.get('/IntimateAdmin/sendMessage', async (ctx, next) => {
	let sendUrl = '';
	const {
		access_token,
		openid,
		data,
	} = ctx.query
	sendUrl = "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=" + access_token;
	const postdata = querystring.stringify({
		touser: openid,
		template_id: 'HWIv-fEMymRtTF__AjP31sWuKilWU4GnDWvCAlrXoTg',
		data:JSON.parse(data)
	})
	let postreq = http.request(sendUrl, {
		method: 'POST'
	}, (res) => {
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			console.log(`响应主体: ${chunk}`);
		});
		res.on('end', () => {
			console.log('响应中已无数据');
		});
	}).on('error', (e) => {
		console.error(81, e);
	});
	console.log(89,postdata)
	console.log(90,sendUrl)
	console.log(91,{
		touser: openid,
		template_id: 'HWIv-fEMymRtTF__AjP31sWuKilWU4GnDWvCAlrXoTg',
		data:JSON.parse(data)
	})
	postreq.write(postdata);
	postreq.end();
	ctx.body = {
		state: 1,
		message: "推送成功"
	}
})
const token = "asdasdfsafdsfdgdfghfdhhdf";
router.get('/IntimateAdmin/checkWx',async (ctx,next)=>{

	const { signature,timestamp,nonce} = ctx.query;
	const tmpstr = [token, timestamp, nonce].sort().join();

	    let sha = sha1(tmpstr);
	
	    if(sha == signature){
	        ctx.body = true;
	    } else {
	        ctx.body = false;
	    }
})

module.exports = router
//asdasdfsafdsfdgdfghfdhhdf