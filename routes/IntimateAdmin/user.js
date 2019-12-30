const router = require('koa-router')()
const {
	signin,
	signout,
	register,
	retrievepassword,
	loginStatus
} = require("./../../controller/IntimateAdmin/user.js")

router.post('/IntimateAdmin/signin', signin)

router.get('/IntimateAdmin/signout', signout)

router.post('/IntimateAdmin/register', register)

router.get('/IntimateAdmin/retrievepassword', retrievepassword)

router.post('/IntimateAdmin/loginStatus', loginStatus)




module.exports = router
