const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  userId: String,
  subscriptionId: String,
  deliveryDate: Date,
  status: { type: String, default: "upcoming" }
});

module.exports = mongoose.model("Delivery", deliverySchema);