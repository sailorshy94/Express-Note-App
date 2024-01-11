const express = require('express');
// morgan allows us to log reqs locally
const morgan = require('morgan');
// used to send data to dir
const fs = require('fs');
// allows to work w/ views dir
const path = require('path');
// nanoid package to generate random id
// const { nanoid } = require('nanoid');

// runs specific check for router # using nullish coalescence operator; will use for Heroku deployment
const PORT = process.env.PORT ?? 3001;
const app = express();

// allows acceptance of json data (notes)
app.use(express.json());
// allows us to see requests made on server locally
app.use(morgan('dev'));

// TODO: 
// GET /notes returns the notes.html file
// HTML route
app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views/notes.html'));
});

// =================================================================================================

// API ROUTES
// reads db.json file and returns saved notes as JSON
// can think of structure like an event listener
app.get('/api/notes', (req, res) => {
    res.json([]);
});

// will receive new note, save on req body, add to db.json file, and return new note to user
// TODO: add npm package that will give each note unique id when saved
// npm package - nanoid(10); - gen random id w 10 chars
app.post('/api/notes', (req, res) => {
    // const data = ;
    // // catch the added notes - needs to default to empty array if no data
    // const notes = ;
    // // will write the db json file 
    // fs.writeFileSync();
    // res.json([]);
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
