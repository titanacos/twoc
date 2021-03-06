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
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.get("/dameLibros",function(req,res,next){

  var json= {libros:[{"nombre":"After", "img": "http://image.casadellibro.com/a/l/t0/37/9788408133537.jpg"},
    {"nombre":"After",
        "img": "http://image.casadellibro.com/a/l/t0/37/9788408133537.jpg"},{"nombre":"After",
        "img": "http://image.casadellibro.com/a/l/t0/37/9788408133537.jpg"},{"nombre":"After",
        "img": "http://image.casadellibro.com/a/l/t0/37/9788408133537.jpg"},
    ]
  };

  res.send(json);
  //res.sendFile(path.join(__dirname + '/libros.json'));

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
    // var url = 'http://openlibrary.org/api/things?query={%22type%22:%22\/type\/edition%22,%20%22isbn_10%22:%220789312239%22}';

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            //console.log(response);
            var jSon= JSON.parse(body);
            console.log(jSon.result[0]);

            // Answering to navigator
            res.send(   "<p>hola</p>"
                    +   jSon.result[0]);


        }
    });


});


app.get('/getBookSon',function(req,res){

    // field puede ser cualquier entrada del libro en formato json
    var field =req.query.field;
    var value =req.query.value;
    var url = 'http://openlibrary.org/search.json?' + field + '=' + value;
    //   "cover_i": 980334,

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            //console.log(response);
            var jSon= JSON.parse(body);

            console.log(jSon);


            // Answering to navigator
            res.send(   "<p>hola</p>"
                    +   body);


        }
    });

});


app.get('/getBookCustom',function(req,res){

//https://covers.openlibrary.org/w/id/980334-M.jpg


    // field puede ser cualquier entrada del libro en formato json
    var title_req =req.query.title;
    var url = 'http://openlibrary.org/search.json?title=' + title_req;

    // We need next fileds of the specified url
        //title
        //author_name
        //cover_i
        //isbn


    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            //console.log(response);
            var jSon_request = JSON.parse(body);

//            console.log(jSon_request);
//            res.send(jSon_request);

            var jSon_answer = {
                title : jSon_request.docs[0].title,
                author_name : jSon_request.docs[0].author_name[0],
                cover_i : 'https://covers.openlibrary.org/w/id/' + jSon_request.docs[0].cover_i + '-M.jpg',
                isbn : jSon_request.docs[0].isbn[0]
            };

            // Answering to navigator
            res.send(jSon_answer);


        }
    });

});

app.get('/getBookcase',function(req,res){

//https://covers.openlibrary.org/w/id/980334-M.jpg

        var author_req =req.query.author;
        var url = 'http://openlibrary.org/search.json?author=' + author_req;

        // We need next fileds of the specified url
            //title
            //author_name
            //cover_i
            //isbn

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                //console.log(response);
                var jSon_request = JSON.parse(body);

    //            console.log(jSon_request);
    //            res.send(jSon_request);

                var jSon_answer = {
                    title : jSon_request.docs[0].title,
                    author_name : jSon_request.docs[0].author_name[0],
                    cover_i : 'https://covers.openlibrary.org/w/id/' + jSon_request.docs[0].cover_i + '-M.jpg',
                    isbn : jSon_request.docs[0].isbn[0]
                };

                var bookcase = new Array();

                for (var i = 0; i < jSon_request.docs.length; i++) {

                    bookcase.push(
                        {
                            title: jSon_request.docs[i].title,
                            img : 'https://covers.openlibrary.org/w/id/' + jSon_request.docs[i].cover_i + '-M.jpg'
                        }
                                 )
                }

                // Answering to navigator
                console.log(bookcase);
                res.send(bookcase);



            }
        });


});


app.use('/api', apiRouter);

// START THE SERVER
// ======================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
