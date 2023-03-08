const mongoose = require("mongoose");

const MONGO_DB_URL = `mongodb+srv://gopal-gurram:4X6bdMYWapSFnqFF@nasa1.5xv3gy1.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection REady!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_DB_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}
module.exports = {
  mongoConnect,
  mongoDisconnect,
};
