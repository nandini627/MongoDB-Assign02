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

const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Update failed",
      error: err.message,
    });
  }
};

const replaceNote = async (req, res) => {
  try {
    const replacedNote = await Note.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!replacedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      data: replacedNote,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Replace failed",
      error: err.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: err.message,
    });
  }
};

const createBulkNotes = async (req, res) => {
  try {
    const notes = await Note.insertMany(req.body);

    res.status(201).json({
      success: true,
      message: "Notes created successfully",
      data: notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Bulk creation failed",
      error: err.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: err.message,
    });
  }
};

const deleteBulkNotes = async (req, res) => {
  try {
    const result = await Note.deleteMany({
      _id: { $in: req.body.ids },
    });

    res.status(200).json({
      success: true,
      message: "Notes deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Bulk delete failed",
      error: err.message,
    });
  }
};

const getNotesByCategory = async (req, res) => {
  try {
    const notes = await Note.find({
      category: req.params.category,
    });

    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch category notes",
      error: err.message,
    });
  }
};

const getNotesByStatus = async (req, res) => {
  try {
    const notes = await Note.find({
      isPinned: req.params.isPinned === "true",
    });

    res.status(200).json({
      success: true,
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

const getNoteSummary = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .select("title category");

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch summary",
      error: err.message,
    });
  }
};

const filterNotes = async (req, res) => {
  try {
    const query = {};

    if (req.query.category)
      query.category = req.query.category;

    if (req.query.isPinned)
      query.isPinned = req.query.isPinned === "true";

    const notes = await Note.find(query);

    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Filter failed",
      error: err.message,
    });
  }
};

const filterPinnedNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      isPinned: req.query.isPinned === "true",
    });

    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Filter failed",
      error: err.message,
    });
  }
};

const filterCategoryNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      category: req.query.category,
    });

    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Filter failed",
      error: err.message,
    });
  }
};

const filterNotesByDateRange = async (req, res) => {
  try {
    const notes = await Note.find({
      createdAt: {
        $gte: new Date(req.query.start),
        $lte: new Date(req.query.end),
      },
    });

    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Date filter failed",
      error: err.message,
    });
  }
};

module.exports = { createNote, getAllNotes, getNoteById, updateNote, replaceNote, deleteNote, createBulkNotes, deleteBulkNotes ,deleteNote, getNotesByCategory, getNotesByStatus, getNoteSummary, filterNotes, filterPinnedNotes, filterCategoryNotes, filterNotesByDateRange};