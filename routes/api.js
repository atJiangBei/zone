const router = require('koa-router')()
const {
	signin,
	signout,
	register,
	retrievepassword,
	loginStatus
} = require("./../controller/outerapi.js")

router.post('/signin', signin)

router.get('/signout', signout)

router.post('/register', register)

router.get('/retrievepassword', retrievepassword)

router.post('/loginStatus', loginStatus)




module.exports = router
