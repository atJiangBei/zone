const router = require('koa-router')()
const {
	addCommodity,
	queryCommodity,
	deleteCommodity
} = require("./../../controller/IntimateAdmin/commodity.js")

router.post('/IntimateAdmin/add/commodity', addCommodity)
router.get('/IntimateAdmin/query/commodity', queryCommodity)

router.get('/IntimateAdmin/delete/commodity', deleteCommodity)


module.exports = router
