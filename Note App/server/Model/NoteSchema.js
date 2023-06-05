const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please Enter Your Note Title"],
    maxLength: [150, "Title length cannot exceed from 150 character"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Your Note Description"],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NoteModel = mongoose.model("Note", NoteSchema);
module.exports = NoteModel;
