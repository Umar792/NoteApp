const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please Enter Your UserNAME"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minlength: 6,
  },
  Notes: [
    {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "note",
    },
  ],
  email: {
    type: String,
    required: true,
    unique: [true, "Email Already Present Kindly Login Your Account"],
    // match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    validate: [validator.isEmail, "Plaese Enter valid Email Adress"],
  },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
