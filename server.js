const express = require('express');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const fs = require('fs')
// const req = require('express/lib/request');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3009;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received`);
    const newNote = req.body;

    console.info(newNote);

    console.info(`${req.method} request received`);
})

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/index.html'))
// })

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})