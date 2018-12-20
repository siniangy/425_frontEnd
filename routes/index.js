var express = require('express');
var router = express.Router();
var MatchList = require('../src/module/matchlist');
var MatchDetail = require('../src/module/matchdetail');
var MatchPlay = require('../src/module/matchplay');

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

// 获取单场比赛数据(数据库里2015年-2017年)的比赛数据
router.post('/getSingleMatchDetail', (req, res, next) => {
	let url = req.body;
	MatchDetail.find(url).exec((err, matchDetail) => {
		if (err) {
			console.log(err);
		} else {
			res.json(matchDetail);
			console.log(matchDetail)
		}
	})
})

// 获取单场数据play-by-play数据(数据库里是2015-01-01)两场比赛数据
router.post('/getSingleMatchPlayByPlay', (req, res, next) => {
	let url = req.body;
	MatchPlay.find(url).exec((err, matchPlay) => {
		if (err) {
			console.log(err);
		} else {
			res.json(matchPlay);
			console.log(matchPlay)
		}
	})
})
module.exports = router;