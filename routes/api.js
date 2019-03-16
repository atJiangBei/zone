const router = require('koa-router')()
const {signin,signout,register,retrievepassword} = require("./../controller/outerapi.js")

router.get('/signin', signin)
router.get('/signout', signout)
router.get('/register', register)
router.get('/retrievepassword',retrievepassword)

module.exports = router
