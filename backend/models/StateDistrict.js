const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
  code: String,
  name: String,
});

const stateDistrictSchema = new mongoose.Schema({
  stateCode: String,
  stateName: String,
  districts: [districtSchema],
});

module.exports = mongoose.model("StateDistrict", stateDistrictSchema);
