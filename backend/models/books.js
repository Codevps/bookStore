const mongoose = require("mongoose");

const book = mongoose.Schema(
  {
    name: { type: String, required: true },
    name: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("book", book);
