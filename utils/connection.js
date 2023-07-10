const mongoose = require('mongoose');
const mongodb_url = "mongodb+srv://mahsan8588:ahsan@cluster0.d7eg9wx.mongodb.net/?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongodb_url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Mongoose is connected")
  );
} catch (e) {
  console.log("Could not connect");
  console.log(e);
}
