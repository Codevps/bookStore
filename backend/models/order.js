const mongoose = require("mongoose");

const order = mongoose.Schema(
  {
    user: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    books: [
      {
        type: mongoose.Types.ObjectId,
        ref: "book",
      },
    ],
    status: [
      {
        type: String,
        default: "Order Placed",
        enum: [
          "Order Placed",
          "Order Shipped",
          "Order Delivered",
          "Order Cancelled",
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", order);
