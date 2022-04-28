const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

notes.get('/notes', (req, res) => {
    res.sendFile('./public/notes.html')
});

notes.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/api/notes', (req, res) => {
    const newNote = req.body;

    res.json(`${req.method} request received`);
    console.info(req.rawHeaders);
    return newNote;
})

module.exports = notes;