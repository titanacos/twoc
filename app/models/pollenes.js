var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollenSchema = new Schema({

	ciudad: String,
	fecha: String,
	valores: Number,
	parametro: String,
	notes: String
});

module.exports = mongoose.model('Pollen', pollenSchema);