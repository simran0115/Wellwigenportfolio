const express = require("express");
const router = express.Router();

const Subscription = require("../models/Subscription");
const { generateSchedule } = require("../utils/scheduler");

router.post("/create", async (req, res) => {
  try {
    const subscription = await Subscription.create(req.body);

    // IMPORTANT: generate deliveries automatically
    await generateSchedule(subscription);

    res.json({
      message: "Subscription created",
      subscription
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;