exports.createRandomStr = function(digit = -10) {
	//生成不同位数的随机数
	return Math.random().toString(36).substr(digit);
}

exports.removeUndefined = function(obj) {
	for (let key in obj) {
		if (!obj[key]) {
			delete obj[key]
		} else if (typeof obj[key] === 'object') {
			removeUndefined(obj[key])
		}
	}
	if (!obj.query) {
		obj.query = {
			page: 1
		}
	}
	return obj
}
