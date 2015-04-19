// BASE SETUP
// ==================================================

// CALL THE PACKAGES ---------------------------------
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config')
var bodyParser = require('body-parser');
var Polen = require('./app/models/pollenes');
// APP CONFIGURATION ---------------------------------

mongoose.connect(config.database, function(err, res) {
    if (err) throw err;
    console.log('connected to database');
});

// use body-parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// basic route for the homepage
app.get('/', function(req, res) {
    res.send('Welcome to our homepage')
});

// routes
var apiRouter = express.Router();

apiRouter.get('/', function(req, res) {
    res.json({ message: 'bienvenido a la api will and victor'})
});

apiRouter.route('/datos')
    .get(function(req, res) {
        Polen.find(function(err, datos) {
            if (err) res.send(err);

            res.json({message: "rulando"});
        });
    });
app.use('/api', apiRouter);

// START THE SERVER
// ======================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
