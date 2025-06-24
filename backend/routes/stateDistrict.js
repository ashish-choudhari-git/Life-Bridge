const express = require("express");
const router = express.Router();
const StateDistrict = require("../models/StateDistrict");

// Get all states
router.get("/states", async (req, res) => {
  try {
    const states = await StateDistrict.find(
      {},
      { stateCode: 1, stateName: 1, _id: 0 }
    ).sort({ stateName: 1 });
    res.json(states);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch states" });
  }
});

// Get districts by state code
router.get("/districts/:stateCode", async (req, res) => {
  const stateCode = req.params.stateCode;

  try {
    const state = await StateDistrict.findOne({ stateCode });
    console.log(`[DEBUG] Found state for code ${stateCode}:`, JSON.stringify(state, null, 2));
    if (state && state.districts) {
      res.json(state.districts);
    } else {
      console.log(`[DEBUG] No districts found or state is null for code: ${stateCode}`);
      res.status(404).json({ error: "State not found or has no districts" });
    }
  } catch (err) {
    console.error(`[ERROR] Failed to fetch districts for stateCode ${stateCode}:`, err);
    res.status(500).json({ error: "Failed to fetch districts" });
  }
});

module.exports = router;