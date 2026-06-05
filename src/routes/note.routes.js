const express = require('express');
const router = express.Router();

const { createNote,getAllNotes ,getNoteById,updateNote} = require('../controllers/note.controller');
router.post('/notes', createNote);
router.get('/notes', getAllNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', updateNote);

module.exports = router;