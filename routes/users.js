const router = require('koa-router')()

//router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = '收到请求!'
})

router.get('/bar', function (ctx, next) {
	console.log("收到请求")
  ctx.body = {
	  state:1,
	  data:"这是一串测试数据"
  }
})

module.exports = router
