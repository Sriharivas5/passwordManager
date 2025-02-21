const mongoose = require("mongoose");

const URL =
  "mongodb+srv://sriharivas1111:e6R4QaKh17YTJtMW@passwordmanager.qpdq2.mongodb.net/?retryWrites=true&w=majority&appName=passwordManager"
mongoose
  .connect(URL)
  .then(() => {
    console.log("database connected succefully");
  })
  .catch((err) => console.log(err));
