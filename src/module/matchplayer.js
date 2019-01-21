const mongoose = require("mongoose");
const MatchSchema = require("../schemas/matchplayer");
const MatchPlayerBox = mongoose.model("MatchPlayerBox", MatchSchema);

module.exports = MatchPlayerBox;
