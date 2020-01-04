const commodity = require("./IntimateAdmin/commodity.js");
const recommender = require("./IntimateAdmin/recommender.js");
const uploadImg = require("./IntimateAdmin/uploadImg.js");
const user = require("./IntimateAdmin/user.js");
const wx = require('./IntimateAdmin/wx.js')
const appointment = require('./IntimateAdmin/appointment.js')
const RouterUseFn = (app)=>{
	app.use(commodity.routes(), commodity.allowedMethods());
	app.use(recommender.routes(), recommender.allowedMethods());
	app.use(uploadImg.routes(), uploadImg.allowedMethods());
	app.use(user.routes(),user.allowedMethods());
	app.use(wx.routes(),wx.allowedMethods());
	app.use(appointment.routes(),appointment.allowedMethods());
}

module.exports = RouterUseFn