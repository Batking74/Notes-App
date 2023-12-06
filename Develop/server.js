const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));


// Api Note Routes
app.route('/api/notes')
.get((req, res) => {
    res.send(JSON.stringify(db));
})
.post((req, res) => {
    const data = req.body;
    console.log(data);
})


// Deletes A Note from Database
app.delete('/api/notes/:id', (req, res) => {
    const noteIndex = req.params.id;
    console.log(noteIndex);
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