const express = require('express');
const router = express.Router();

const { createNote,getAllNotes ,getNoteById,updateNote,replaceNote , deleteNote,createBulkNotes} = require('../controllers/note.controller');
router.post('/notes', createNote);
router.get('/notes', getAllNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', updateNote);
router.patch('/notes/:id', replaceNote);
router.delete('/notes/:id', deleteNote);
router.post('/notes/bulk', createBulkNotes);

module.exports = router;