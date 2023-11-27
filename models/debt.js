const mongoose = require("mongoose");
const debtSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  expense: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Expense",
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Debt", debtSchema);
