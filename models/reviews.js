const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
  userName: { type: String, required: true },
  text: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});

module.exports = mongoose.model("Reviews", ReviewsSchema);
