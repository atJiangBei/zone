/* 
预约订单 
 */
const router = require('koa-router')()
const {
	addAppointment,
	queryAppointment,
	deleteAppointment
} = require("./../../controller/IntimateAdmin/appointment.js")

router.get('/IntimateAdmin/add/appointment', addAppointment)
router.get('/IntimateAdmin/query/appointment', queryAppointment)
router.get('/IntimateAdmin/delete/appointment', deleteAppointment)


module.exports = router
