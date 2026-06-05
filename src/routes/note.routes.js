const express = require('express');
const router = express.Router();

const { createNote,getAllNotes ,getNoteById,updateNote,replaceNote , deleteNote,createBulkNotes,deleteNote,deleteBulkNotes,getNotesByCategory,getNotesByStatus,getNoteSummary,filterNotes} = require('../controllers/note.controller');
router.post('/notes', createNote);
router.get('/notes', getAllNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', updateNote);
router.patch('/notes/:id', replaceNote);
router.delete('/notes/:id', deleteNote);
router.post('/notes/bulk', createBulkNotes);
router.delete('/notes/:id', deleteNote);
router.delete('/notes/bulk', deleteBulkNotes);
router.get('/notes/category/:category', getNotesByCategory);
router.get('/notes/status/:isPinned', getNotesByStatus);
router.get('/notes/summary/:id', getNoteSummary);
router.get('/notes/filter', filterNotes);
module.exports = router;