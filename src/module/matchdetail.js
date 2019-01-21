const mongoose = require("mongoose");
const MatchSchema = require("../schemas/matchdetail");
const MatchDetailBox = mongoose.model("MatchDetailBox", MatchSchema);

module.exports = MatchDetailBox;
