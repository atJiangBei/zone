const router = require('koa-router')()
const {uploadImg,deleteImg} = require("./../../controller/IntimateAdmin/uploadImg.js")
//router.prefix('/users')

router.get('/IntimateAdmin/upload/img', uploadImg)

router.get('/IntimateAdmin/delete/img', deleteImg)


module.exports = router
