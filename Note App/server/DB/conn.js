const mongoose = require("mongoose");

mongoose
  .connect(process.env.BAS_URI)
  .then(() => {
    console.log("Mongoose is connect successfuly");
  })
  .catch((err) => {
    console.log(err.message);
  });
