const UserModel = require("../Model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const NoteModel = require("../Model/NoteSchema");

module.exports = {
  createuser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please enter all the fields",
        });
      }
      const user = await UserModel.findOne({ email: email });
      if (user) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
      await UserModel.create(req.body);

      res.status(200).json({
        success: true,
        message: "Registration Successfuly",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  //   --------------- login user
  // -----------------
  loginuser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please enter all the fields",
        });
      }
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User does not exist",
        });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Password does not match",
        });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
        })
        .json({
          success: true,
          user,
          token,
        });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  //   ----------------------- profile
  // -----------------
  profile: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User does not exist",
        });
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ---------------- updateProfile
  // -----------------
  updateProfile: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User does not exist",
        });
      }
      const { username, email, password } = req.body;
      if (!username) {
        req.status(400).json({
          success: false,
          message: "Please Enter Your username",
        });
      }
      if (!email) {
        req.status(400).json({
          success: false,
          message: "Please Enter Your Email",
        });
      }
      if (!password) {
        req.status(400).json({
          success: false,
          message: "Please Enter Your password",
        });
      }
      (user.username = req.body.username),
        (user.email = req.body.email),
        (user.password = req.body.password),
        await user.save();
      await bcrypt.hash(user.password, 10);
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ----------------------- delete profile
  // -----------------
  deleteProfile: async (req, res) => {
    try {
      const user = await UserModel.findByIdAndDelete(req.user._id);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User does not exist",
        });
      }

      res.status(200).cookie("token", "").json({
        success: true,
        message: "Profile deleted successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // ---------------------- find login user notes

  MyNotes: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }

      const Notes = await NoteModel.find({ author: req.user._id }).populate(
        "author"
      );
      res.status(200).json({
        success: true,
        Notes,
      });
    } catch (error) {}
  },
};
