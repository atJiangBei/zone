const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
router.get('/random', async (ctx, next) => {

	await ctx.render('random', {
		title: 'Hello Koa 2!'
	})
})

router.get('/queryRandomName', async (ctx, next) => {
	var names = require('./../data/random/names.json')
	ctx.body = names
})

router.get('/addRandomName', async (ctx, next) => {
	var names = require('./../data/random/names.json')
	const {
		name
	} = ctx.query;
	if (!name || !name.replace(/\s*/g, "")) {
		ctx.body = {
			status: 0,
			data: names
		}
		return
	}
	names.push({
		name: name
	})
	try {
		fs.writeFileSync(path.join(__dirname, '../data/random/names.json'), JSON.stringify(names));
		var names = require('./../data/random/names.json')
		ctx.body = {
			status: 1,
			data: names
		}
	} catch (e) {
		ctx.body = {
			status: 1,
			data: [],
			err: e
		}
	}
})

router.get('/deleteRandomName', async (ctx, next) => {
	var names = require('./../data/random/names.json')
	const {
		name
	} = ctx.query;
	var length = names.length
	for (var i = 0; i < length; i++) {
		if (names[i].name === name) {
			names.splice(i, 1)
			length--
		}
	}
	try {
		fs.writeFileSync(path.join(__dirname, '../data/random/names.json'), JSON.stringify(names));
		var names = require('./../data/random/names.json')
		ctx.body = {
			status: 1,
			data: names
		}
	} catch (e) {
		ctx.body = {
			status: 1,
			data: [],
			err: e
		}
	}
})

router.get('/json', async (ctx, next) => {
	ctx.body = {
		title: 'koa2 json'
	}
})

module.exports = router
