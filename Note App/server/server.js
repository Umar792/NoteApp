const express = require("express");
const app = express();
const cookieparse = require("cookie-parser");
const cors = require("cors");

// ------------ cookieparse
app.use(cookieparse());

// -------------- cors
app.use(cors());

// ----------------------- bodyParser
var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// ------------- dotenv
require("dotenv").config();

// -------------- mongoose connection
require("./DB/conn");

// ----------- router
app.use("/", require("./Router/userrouter"));
app.use("/", require("./Router/NoteRouter"));

const server = app.listen(process.env.PORT, () => {
  console.log(`express server running on port ${process.env.PORT}`);
});

// ------------------------- uncaughtException Error
process.on("uncaughtException", (err) => {
  console.log(`Error due to uncaughtException is ${err.message}`);
  console.log("server is shutting down");
  server.close(() => {
    process.exit(1);
  });
});

// ------------------------- unhandledRejection Error
process.on("unhandledRejection", (err) => {
  console.log(`Error due to unhandledRejection ${err.message}`);
  console.log("server is shuttin down");
  server.close(() => {
    process.exit(1);
  });
});
