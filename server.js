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

apiRouter.use(function(req,res,next) {

	console.log('Somebody just came to our app');

	next();
});

apiRouter.get('/', function(req, res) {
	res.json({ message: 'bienvenido a la api will and victor'})
});

apiRouter.route('/datos')

	.post(function(req,res) {
		var polen = new Polen();

		polen.ciudad = req.body.ciudad;
		polen.fecha = req.body.fecha;
		polen.valores = req.body.valores;
		polen.parametro = req.body.parametro;
		polen.notes = req.body.notes;

		polen.save(function(err) {
			if (err) {
				if (err.code == 11000)
					return res.json({ success: false, message: 'Un polen con esos datos ya existe'});
				else
					return res.send(err);
			}
			res.json({ message: 'polen creado'})
		})
	})
	.get(function(req, res) {
		Polen.find(function(err, datos) {
			if (err) res.send(err);

			res.json(datos);
		});
	});

apiRouter.route('/datos/:dato_id')

	.get(function(req, res) {
		Polen.findById(req.params.dato_id, function(err, dato) {
			if (err) res.send(err);

			res.json(dato);
		});
	})

	.put(function(req, res) {
		Polen.findById(req.params.dato_id, function(err, polen) {
			if (err) res.send(err);

			if (req.body.ciudad) polen.ciudad = req.body.ciudad;
			if (req.body.fecha) polen.fecha = req.body.fecha;
			if (req.body.valores) polen.valores = req.body.valores;
			if (req.body.parametro) polen.parametro = req.body.parametro;
			if (req.body.notes) polen.notes = req.body.notes;

			polen.save(function(err) {
				if (err) res.send(err);

				res.json({message: 'polen actualizado'})
			});

		});
	})

	.delete(function(req, res) {
		Polen.remove({
			_id: req.params.dato_id
		}, function(err, dato) {
			if (err) return res.send(err);

			res.json({message: 'Se ha eliminado'})
		});
	});



app.use('/api', apiRouter);

// START THE SERVER
// ======================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);





