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




module.exports = { createNote, };