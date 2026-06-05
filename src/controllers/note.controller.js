const Note = require('../models/note.model');

const createNote = async (req, res) => {
  const { title, content, category } = req.body;

  try {
    const newNote = new Note({ title, content, category });
    await newNote.save();

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: newNote,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Note creation failed',
      error: err.message,
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
      error: err.message,
    });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch note",
      error: err.message,
    });
  }
};

module.exports = { createNote, getAllNotes, getNoteById };