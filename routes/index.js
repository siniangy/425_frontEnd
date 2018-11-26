var express = require('express');
var router = express.Router();
var MatchList = require('../src/module/match');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});


// 获取当前日期的比赛列表
router.post('/getMatchItems', (req, res, next) => {
	let date = req.body;
	console.log(req.body);
	MatchList.find({
		'date': '20181126'
	}).exec((err, matchItems) => {
		if (err) {
			console.log(err);
		} else {
			res.json(matchItems);
			console.log(matchItems)
		}
	})
})
module.exports = router;