const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");
const twilio = require("twilio");
require("dotenv").config();

// Twilio config
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// POST route to handle form data
router.post("/", async (req, res) => {
  try {
    const newDonor = new Donor(req.body);
    await newDonor.save();

    // We can customize messege
    const smsText = `
   New Blood Donation Form:
   Name: ${newDonor.fullName}
   Age: ${newDonor.age}
   Blood Group: ${newDonor.bloodGroup}
   Phone: ${newDonor.phone}
   Email: ${newDonor.email}
   City: ${newDonor.city}
   Location: ${newDonor.donationLocation}
   Consent: ${newDonor.consent ? "Yes" : "No"}
   
   `;

    // SMS modulation
    await client.messages.create({
      body: smsText,
      from: process.env.TWILIO_PHONE,
      to: process.env.MY_PHONE,
    });

    res
      .status(201)
      .json({ message: "Donation info saved & SMS sent successfully!" });
  } catch (error) {
    console.error("Error saving data or sending SMS:", error);
    res
      .status(500)
      .json({
        error: "Failed to save data or send SMS.",
        details: error.message,
      });
  }
});

module.exports = router;
