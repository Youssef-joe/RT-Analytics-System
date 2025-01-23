const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/Analysis";

 async function connectDB() {
  try {
    await mongoose.connect(uri);

    console.log("Connected to mongoDB");
  } catch (err) {
    console.error("Error Connecting to DB", err);
  }
}


module.exports = connectDB

