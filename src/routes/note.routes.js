const express = require('express');
const router = express.Router();

const { createNote,getAllNotes ,getNoteById} = require('../controllers/note.controller');
router.post('/notes', createNote);
router.get('/notes', getAllNotes);
router.get('/notes/:id', getNoteById);

module.exports = router;