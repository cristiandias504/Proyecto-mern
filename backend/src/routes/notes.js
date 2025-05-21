const { Router } = require('express');
const router = Router();

const {getNotes, createNote, getNote, deleteNote, updateNote} = require('../controllers/notes.controller');

router.route('/')
    //.get((req, res) => res.send('GET - Notes Routes'))
    //.post((req, res) => res.send('POST - Notes Routes'))

    .get(getNotes)
    .post(createNote)

router.route('/:id')
        .get(getNote)
        .put(updateNote)
        .delete(deleteNote)
  
module.exports = router;