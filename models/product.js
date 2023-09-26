const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
});
schema.virtual("url").get(function () {
  // return `/products/${this._id}`;
  return `/products`;
});

module.exports = mongoose.model("Product", schema);
