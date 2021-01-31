// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 1202;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

// GET route

app.get('/all', sendData);
function sendData (request, response) {
  console.log(projectData);
  response.send(projectData);
};


// POST route
app.post('/add', addW);

function addW (req,res){
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
  }
    Object.assign(projectData, newEntry)
    console.log(projectData);
    res.send(projectData);
};

