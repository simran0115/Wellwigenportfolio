const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  fruitName: String,
  quantity: Number
});

module.exports = mongoose.model("Stock", stockSchema);