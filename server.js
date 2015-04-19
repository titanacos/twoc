// BASE SETUP
// ==================================================

// CALL THE PACKAGES ---------------------------------
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config')
var bodyParser = require('body-parser');
var Usuario = require('./app/models/pollenes');
var Libro = require('./app/models/pollenes');
var request = require('request');
var path = require('path');
// APP CONFIGURATION ---------------------------------

mongoose.connect(config.database, function(err, res) {
	if (err) throw err;
	console.log('connected to database');
});

// use body-parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
// basic route for the homepage
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
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

apiRouter.route('/libros')

    .post(function(req,res) {
        var libro = new Libro();

		libro.titulo = req.body.titulo;
		libro.autor = req.body.autor;
		libro.ISBN = req.body.ISBN;
		libro.imgLink = req.body.imgLink;
		libro.localizacion = req.body.localizacion;

        libro.save(function(err) {
            if (err) {
                if (err.code == 11000)
                    return res.json({ success: false, message: 'Un libro con esos datos ya existe'});
                else
                    return res.send(err);
            }
            res.json({ message: 'libros creado'})
        })
    })
    .get(function(req, res) {
        Libro.find(function(err, datos) {
            if (err) res.send(err);

            res.json(datos);
        });
    });

apiRouter.route('/libros/:libro_id')

    .get(function(req, res) {
        Libro.findById(req.params.dato_id, function(err, dato) {
            if (err) res.send(err);

            res.json(dato);
        });
    })

    .put(function(req, res) {
        Libro.findById(req.params.dato_id, function(err, libros) {
            if (err) res.send(err);

			if (req.body.titulo) libros.titulo = req.body.titulo;
			if (req.body.autor) libros.autor = req.body.autor;
			if (req.body.ISBN) libros.ISBN = req.body.ISBN;
			if (req.body.imgLink) libros.imgLink = req.body.imgLink;
			if (req.body.localizacion) libros.localizacion = req.body.localizacion;

            libros.save(function(err) {
                if (err) res.send(err);

                res.json({message: 'libros actualizado'})
            });

        });
    })

    .delete(function(req, res) {
        Libro.remove({
            _id: req.params.dato_id
        }, function(err, dato) {
            if (err) return res.send(err);

			res.json({message: 'Se ha eliminado'})
		});
	});
apiRouter.route('/usuarios')

    .post(function(req,res) {
        var usuario = new Usuario();

        usuario.nombre = req.body.nombre;
        usuario.ciudad = req.body.ciudad;

        usuario.save(function(err) {
            if (err) {
                if (err.code == 11000)
                    return res.json({ success: false, message: 'Un usuario con esos datos ya existe'});
                else
                    return res.send(err);
            }
            res.json({ message: 'usuario creado'})
        })
    })
    .get(function(req, res) {
        Usuario.find(function(err, datos) {
            if (err) res.send(err);

            res.json(datos);
        });
    });

apiRouter.route('/usuarios/:usuario_id')

    .get(function(req, res) {
        Usuario.findById(req.params.dato_id, function(err, dato) {
            if (err) res.send(err);

            res.json(dato);
        });
    })

    .put(function(req, res) {
        Usuario.findById(req.params.dato_id, function(err, usuario) {
            if (err) res.send(err);

            if (req.body.nombre) usuario.nombre = req.body.nombre;
            if (req.body.ciudad) usuario.ciudad = req.body.ciudad;

            usuario.save(function(err) {
                if (err) res.send(err);

                res.json({message: 'usuario actualizado'})
            });

        });
    })

    .delete(function(req, res) {
        Usuario.remove({
            _id: req.params.dato_id
        }, function(err, dato) {
            if (err) return res.send(err);

            res.json({message: 'Se ha eliminado'})
        });
    });

app.get('/getBook',function(req,res){

 var param =req.query.word;
  var url = 'http://openlibrary.org/api/things?query={"type": ' + param + ' , "isbn_10":"0789312239"}';
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      //console.log(response);
      var jSon= JSON.parse(body);

      console.log(body);
      console.log(jSon.result[0]);
    }
    res.send("deberias hacer algo");
  });


});

app.use('/api', apiRouter);

// START THE SERVER
// ======================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);





