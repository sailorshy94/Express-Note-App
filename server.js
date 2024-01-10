const express = require('express');
// morgan allows us to log reqs locally
const morgan = require('morgan');
// used to send data to dir
const fs = require('fs');

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

});

// reads db.json file and returns saved notes as JSON
app.get('/api/notes', (req, res) => {

});

// will receive new note, save on req body, add to db.json file, and return new note to user
// TODO: add npm package that will give each note unique id when saved
// possible npm packages?? - uuid
// npm install uuid
app.post('/api/notes', (req, res) => {

});

// will redirect to html file
// HTML route
app.get('*', (req, res) => {

});

// will listen for connections to PORT
app.listen();
