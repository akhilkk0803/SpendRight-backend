const mongoose = require("mongoose");
const friendSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  friends: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "User",
  },
});
module.exports = mongoose.model("Friend", friendSchema);
