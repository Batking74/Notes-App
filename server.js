// Importing Modules/Packages
const bodyParser = require('body-parser');
const express = require('express');
let db = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;


// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


// Api Note Routes
app.route('/api/notes')
.get((req, res) => res.send(JSON.stringify(db)))
.post((req, res) => {
    const data = req.body;
    db.push(data);
    fs.writeFile('./db/db.json', JSON.stringify(db), (error) => {
        if(error) console.log(error);
    });
})


// Deletes A Note from Database
app.delete('/api/notes/:id', (req, res) => {
    const noteID = parseInt(req.params.id.replace(':', ''));
    const newDB = db.filter((value, i) => db[i].id != noteID);
    db = newDB;
    fs.writeFile('./db/db.json', JSON.stringify(newDB), (error) => {
        if(error) console.log(error);
    });
})


// Notes Page Route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'), (error) => {
        if(error) console.log(error);
    })
})


// Starting server
app.listen(PORT, (error) => {
    if(error) console.log(error);
    console.log('listening on PORT 3001!');
})