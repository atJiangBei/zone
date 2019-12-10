const router = require('koa-router')()
const {queryRecommender,deleteRecommender,addRecommender} = require("./../../controller/IntimateAdmin/recommender.js")
//router.prefix('/users')

router.get('/IntimateAdmin/add/recommender', addRecommender)

router.get('/IntimateAdmin/query/recommender', queryRecommender)

router.get('/IntimateAdmin/delete/recommender', deleteRecommender)

module.exports = router
