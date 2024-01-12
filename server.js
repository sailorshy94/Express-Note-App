const express = require('express');
// morgan allows us to log reqs locally
const morgan = require('morgan');
// used to send data to dir
const fs = require('fs');
// allows to work w/ views dir
const path = require('path');
// nanoid package to generate random id
const { nanoid } = require('nanoid');

// runs specific check for router # using nullish coalescence operator; will use for Heroku deployment
const PORT = process.env.PORT ?? 3001;
const app = express();

// allows acceptance of json data (notes)
app.use(express.json());

// TODO: add middleware
app.use(express.urlencoded({extended: true }));
// allows to serve files from public dir - ie JS
app.use(express.static('public'));

// allows us to see requests made on server locally
app.use(morgan('dev'));

// GET /notes returns the notes.html file
// HTML route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/notes.html'));
});

// =================================================================================================

// API ROUTES
// reads db.json file and returns saved notes as JSON
// can think of structure like an event listener
app.get('/api/notes', (req, res) => {
    // set db file json to const variable data
    const data = fs.readFileSync('db/db.json', 'utf-8');
    // grabs the notes array, if no data then defaults to empty array
    const notes = data ? JSON.parse(data) : [];
    // returns the notes array
    res.json(notes);
});

// will receive new note, save on req body, add to db.json file, and return new note to user
// npm package - nanoid(10); - gen random id w 10 chars
app.post('/api/notes', (req, res) => {
    const data = fs.readFileSync('db/db.json', 'utf-8');
    // catch the added notes - needs to default to empty array if no data
    const notes = data ? JSON.parse(data) : [];
    // takes new notes and adds them to the array, spread expands array - allows us to copy and add to it, applies nanoid
    notes.push({...req.body, id: nanoid(10)});
    console.log({...req.body, id: nanoid(10)});
     // properly formats the notes JSON obj into a string
    const notesStr = JSON.stringify(notes, null, 2);
    // will write to the db json file 
    fs.writeFileSync('./db/db.json', notesStr);
    // res.json(req.body);
});


// =================================================================================================
// will redirect to html file - the homepage - always goes below
// HTML route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

// will listen for connections to PORT - goes at bottom
app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});
