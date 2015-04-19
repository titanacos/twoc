var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var librosSchema = new Schema({

	titulo: String,
	autor: String,
	ISBN: String,
	imgLink: String,
	localizacion: String
});

var usuarioSchema = new Schema({

    nombre : String,
    ciudad: String

});

module.exports = mongoose.model('Usuario', usuarioSchema);
module.exports = mongoose.model('Libro', librosSchema);
