const { default: mongoose } = require("mongoose");
const NoteModel = require("../Model/NoteSchema");
const UserModel = require("../Model/UserSchema");

module.exports = {
  createNote: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id);
      const { title, description } = req.body;
      if (!title) {
        return res.status(400).json({
          success: false,
          message: "Please Enter Title",
        });
      }
      if (!description) {
        return res.status(400).json({
          success: false,
          message: "Please Enter Description",
        });
      }

      const note = await NoteModel.create({
        author: req.user._id,
        title: req.body.title,
        description: req.body.description,
      });

      user.Notes.push(note._id);
      await user.save();

      res.status(200).json({
        success: true,
        message: "Note Create Successfuly",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  //   ------------------ get all notes
  AllNotes: async (req, res) => {
    try {
      const AllNotes = await NoteModel.find().populate("author");
      res.status(200).json({
        success: true,
        AllNotes,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  //   ----------------- get Single Note

  SingleNote: async (req, res) => {
    try {
      const note = await NoteModel.findById(req.params.id).populate("author");
      if (!note) {
        return res.status(400).json({
          success: false,
          message: `Note is not found on this id ${req.params.id}`,
        });
      }

      res.status(200).json({
        success: true,
        note,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  //   --------------- delete note

  deleteNote: async (req, res) => {
    try {
      const note = await NoteModel.findById(req.params.id);
      const user = await UserModel.findById(req.user._id);
      if (!note) {
        return res.status(400).json({
          success: false,
          message: `Note is not found on this id ${req.params.id}`,
        });
      }

      if (note.author.toString() !== req.user._id.toString()) {
        return res.status(400).json({
          success: false,
          message: `sory ${user.username} you cannot delete this Note`,
        });
      }

      note.deleteOne();
      // Remove the note ID from the user's Notes array
      const noteIdToDelete = req.params.id;
      const index = user.Notes.indexOf(noteIdToDelete);
      if (index > -1) {
        user.Notes.splice(index, 1);
      }
      await user.save();

      res.status(200).json({
        success: true,
        message: "Note Deleted Successfuly",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  //   -------------- update Note

  UpdateNote: async (req, res) => {
    try {
      const note = await NoteModel.findById(req.params.id);
      if (!note) {
        return res.status(400).json({
          success: false,
          message: "Note is not found",
        });
      }

      if (note.author.toString() !== req.user._id.toString()) {
        return res.status(400).json({
          success: false,
          message: `Sorry You Cannot Update This Note`,
        });
      }

      const newNote = await NoteModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Note Update Successfuly",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
