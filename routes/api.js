const router = require('koa-router')()
const {signin,signout,register,retrievepassword} = require("./../controller/outerapi.js")

router.post('/signin', signin)
router.get('/signout', signout)
router.post('/register', register)
router.get('/retrievepassword',retrievepassword)

module.exports = router
