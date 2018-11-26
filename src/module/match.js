const mongoose = require('mongoose');
const MatchSchema = require('../schemas/match');
const MatchListBox = mongoose.model('MatchListBox', MatchSchema);

module.exports = MatchListBox;