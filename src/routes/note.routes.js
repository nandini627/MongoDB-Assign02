const express = require('express');
const router = express.Router();

const { createNote,getAllNotes } = require('../controllers/note.controller');
router.post('/notes', createNote);
router.get('/notes', getAllNotes);


module.exports = router;