const mongoose = require("mongoose");
const Note = require("../models/note.model");

// Helper: validate ObjectId
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// 1. CREATE
exports.createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null,
      });
    }

    const note = await Note.create({ title, content, category, isPinned });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

// 2. BULK CREATE
exports.createNotesBulk = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || !notes.length) {
      return res.status(400).json({
        success: false,
        message: "Notes array required",
        data: null,
      });
    }

    const result = await Note.insertMany(notes);

    res.status(201).json({
      success: true,
      message: `${result.length} notes created successfully`,
      data: result,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

// 3. GET ALL
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    res.json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

// 4. GET BY ID
exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID", data: null });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found", data: null });
    }

    res.json({ success: true, message: "Note fetched successfully", data: note });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

// 5. PUT
exports.replaceNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID", data: null });
    }

    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      overwrite: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found", data: null });
    }

    res.json({ success: true, message: "Note replaced successfully", data: note });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

// 6. PATCH
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null,
      });
    }

    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID", data: null });
    }

    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found", data: null });
    }

    res.json({ success: true, message: "Note updated successfully", data: note });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

// 7. DELETE
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID", data: null });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found", data: null });
    }

    res.json({ success: true, message: "Note deleted successfully", data: null });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};