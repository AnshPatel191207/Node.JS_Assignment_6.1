const express = require("express");
const router = express.Router();
const controller = require("../controllers/note.controller");

router.post("/", controller.createNote);
router.post("/bulk", controller.createNotesBulk);
router.get("/", controller.getAllNotes);

module.exports = router;