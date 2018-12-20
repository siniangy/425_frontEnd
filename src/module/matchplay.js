const mongoose = require('mongoose');
const MatchSchema = require('../schemas/matchplay');
const MatchPlayBox = mongoose.model('MatchPlayBox', MatchSchema);

module.exports = MatchPlayBox;