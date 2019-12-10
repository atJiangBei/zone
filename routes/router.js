const commodity = require("./IntimateAdmin/commodity.js");
const recommender = require("./IntimateAdmin/recommender.js");
const uploadImg = require("./IntimateAdmin/uploadImg.js");


const RouterUseFn = (app)=>{
	app.use(commodity.routes(), commodity.allowedMethods());
	app.use(recommender.routes(), recommender.allowedMethods());
	app.use(uploadImg.routes(), uploadImg.allowedMethods());
}

module.exports = RouterUseFn