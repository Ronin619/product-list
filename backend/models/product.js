const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Reviews" }],
});

module.exports = mongoose.model("Product", ProductSchema);
