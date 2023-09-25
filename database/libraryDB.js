const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.URI);
  } catch (error) {
    console.log(error);
  }
}
module.exports = connectDB;
