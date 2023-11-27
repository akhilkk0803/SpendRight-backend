const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const transactionRoutes = require("./routes/transaction");
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);
app.use("/transaction", transactionRoutes);
app.use((error, req, res, next) => {
  res.status(error.statusCode).json({ msg: error.message });
  next();
});
app.listen(8080, () => console.log("server running on port 8080"));
mongoose
  .connect(
    "mongodb+srv://akhil:akhil@cluster0.0oqnztv.mongodb.net/SpendRight?retryWrites=true&w=majority"
  )
  .then(() => console.log("mdb connected"))
  .catch((err) => console.log("err in mdb"));
