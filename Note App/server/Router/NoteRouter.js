const express = require("express");
const router = express.Router();
const TokenVerify = require("../middleware/TokenVerify");
const controller = require("../CONTROLLER/NotesController");

router.post("/CreateNote", TokenVerify, controller.createNote);

router.get("/allNotes", controller.AllNotes);

router.get("/singleNote/:id", controller.SingleNote);

router.delete("/DeleteNote/:id", TokenVerify, controller.deleteNote);

router.put("/UpdateNote/:id", TokenVerify, controller.UpdateNote);

module.exports = router;
