const mongoose = require("mongoose");
const { MONGODB_URI_TEST, MONGODB_URI } = require("./envConfig");

const dbUri = process.env.NODE_ENV === "test" ? MONGODB_URI_TEST : MONGODB_URI;

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(dbUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected. Host -: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit();
  }
};

module.exports = ConnectDB;
