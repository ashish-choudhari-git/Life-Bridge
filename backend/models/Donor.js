const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  weight: { type: Number, required: true },

  phone: { type: String, required: true },
  altPhone: { type: String },
  email: { type: String },

  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  fullAddress: { type: String },

  donationLocation: { type: String, required: true },

  // Health declaration checkboxes-elgibility
  ageAbove18: { type: Boolean, default: false },
  weightAbove50: { type: Boolean, default: false },
  notDonatedRecently: { type: Boolean, default: false },
  noDisease: { type: Boolean, default: false },
  consent: { type: Boolean, required: true },
});

module.exports = mongoose.model("Donor", donorSchema);
