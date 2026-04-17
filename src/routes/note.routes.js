const express = require("express");
const router = express.Router();
const controller = require("../controllers/note.controller");

router.post("/", controller.createNote);
router.post("/bulk", controller.createNotesBulk);
router.get("/", controller.getAllNotes);
router.get("/:id", controller.getNoteById);
router.put("/:id", controller.replaceNote);
router.patch("/:id", controller.updateNote);

module.exports = router;