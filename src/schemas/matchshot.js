const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MatchShot = new Schema(
  {
    url: {
      type: String,
      required: true
    },
    team1Img: {
      type: String,
      required: true
    },
    team2Img: {
      type: String,
      required: true
    },
    team1ChartData: {
      type: Array,
      required: true
    },
    team2ChartData: {
      type: Array,
      required: true
    }
  },
  {
    collection: "matchshot"
  }
);

module.exports = MatchShot;
