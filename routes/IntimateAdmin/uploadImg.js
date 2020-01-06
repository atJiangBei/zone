const router = require('koa-router')()
const multer = require('koa-multer');
const path = require('path')
const isLinux = process.platform === 'linux'
const {
	createRandomStr,
} = require('./../../common')
let pathUrl = function(isLinux){
	if(isLinux){
		return path.join(__dirname,'../../../../assets/imgs')
	}else{
		return path.join(__dirname,'../../public/uploadimgs')
	}
}

const {
	uploadImg,
	queryImg,
	deleteImg
} = require("./../../controller/IntimateAdmin/uploadImg.js")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathUrl(isLinux))
    },
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null,fileFormat[0] + createRandomStr() + "." + fileFormat[fileFormat.length - 1]);
		//cb(null,file.originalname);
    }
})
const upload = multer({ storage });

router.post('/IntimateAdmin/upload/img', upload.single('img'),uploadImg)
router.get('/IntimateAdmin/query/img', queryImg)
router.get('/IntimateAdmin/delete/img', deleteImg)



module.exports = router
