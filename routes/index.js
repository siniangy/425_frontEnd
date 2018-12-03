var express = require('express');
var router = express.Router();
var MatchList = require('../src/module/matchlist');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});


// 获取当前日期(数据库里是2015-2017年)的比赛列表
router.post('/getMatchItems', (req, res, next) => {
	let date = req.body;
	MatchList.find(date).exec((err, matchItems) => {
		if (err) {
			console.log(err);
		} else {
			res.json(matchItems);
			console.log(matchItems)
		}
	})
})
module.exports = router;