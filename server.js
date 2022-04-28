const express = require('express');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const fs = require('fs')
const path = require('path');

const PORT = process.env.PORT || 3009;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if(title && text) {
        const newNote = {
            title,
            text
        }
        
        readAndAppend(newNote, './db/db.json');
        
        const response = {
            status: 'success',
            body: newNote
        }
        
        res.json(response)
    } else {
        res.json('Error in saving new note');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})