const mongoose = require("mongoose");

const favouriteRouter = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model("favourite", favouriteRouter);
