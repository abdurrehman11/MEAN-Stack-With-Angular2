const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const config = require('./config/database');   
const path = require('path');  
const authentication = require('./routes/authentication')(router);  
const bodyParser = require('body-parser'); 

const app = express();

// Database Connectionn
mongoose.Promise = global.Promise;
mongoose.createConnection(config.uri, (err) => {
    if(err) {
        console.log('Could not connect to database: ', err);
    } else {
        console.log('Connected to database ' + config.db);
    }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Provide static directory for frontend
app.use(express.static(__dirname + '/client/dist/'));

app.use('/authentication', authentication);

// Connect server to Angular2 index.html
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});