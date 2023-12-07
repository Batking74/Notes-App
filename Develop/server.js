const express = require('express');
const path = require('path');
let db = require('./db/db.json');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


// Api Note Routes
app.route('/api/notes')
.get((req, res) => {
    res.send(JSON.stringify(db));
})
.post((req, res) => {
    const data = req.body;
    db.push(data);
})


// Deletes A Note from Database
app.delete('/api/notes/:id', (req, res) => {
    const noteID = parseInt(req.params.id.replace(':', ''));
    const newDB = db.filter((value, id) => id != noteID);
    db = newDB;
})


// Notes Page Route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'), (error) => {
        if(error) console.log(error);
    })
})


// Starting server
app.listen(3001, (error) => {
    if(error) console.log(error);
    console.log('listening on PORT 3001!');
})