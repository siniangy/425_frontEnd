const mongoose = require('mongoose');
const MatchSchema = require('../schemas/matchshot');
const MatchShotBox = mongoose.model('MatchShotBox', MatchSchema);

module.exports = MatchShotBox;