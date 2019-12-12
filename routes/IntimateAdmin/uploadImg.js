const router = require('koa-router')()
const {
	uploadImg,
	deleteImg
} = require("./../../controller/IntimateAdmin/uploadImg.js")
//router.prefix('/users')

router.post('/IntimateAdmin/upload/img', uploadImg)
router.get('/IntimateAdmin/query/img', deleteImg)
router.get('/IntimateAdmin/delete/img', deleteImg)


module.exports = router
