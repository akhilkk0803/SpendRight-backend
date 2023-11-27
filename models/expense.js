const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "owner",
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
    },
    user: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
    },
    admin: {
      default: "none",
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    totalAmount: {
      type: Number,
    },
    amount: {
      type: Number,
    },

    message: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Expense", expenseSchema);
