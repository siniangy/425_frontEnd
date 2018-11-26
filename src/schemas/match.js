const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Match = new Schema({
	date: {
		type: String,
		required: true
	},
	content: { // 两个字段。内容和时间
		type: Array,
		required: true
	}
}, {
	collection: 'match'
});

module.exports = Match;