// BASE SETUP
// ==================================================

// CALL THE PACKAGES ---------------------------------
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config')
var bodyParser = require('body-parser');
// APP CONFIGURATION ---------------------------------



// use body-parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// basic route for the homepage
app.get('/', function(req, res) {
	res.send('Welcome to our homepage')
});

app.get('/saludame', function(req, res) {
	console.log(req);
	res.send('saludado');

});

// START THE SERVER
// ======================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);





