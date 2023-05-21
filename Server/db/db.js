let mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://AyanNaseer:Ghost-67@combinedb.x23qgg7.mongodb.net/ExpenseTracker?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
