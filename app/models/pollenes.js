var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollenSchema = new Schema({

	titulo: String,
	autor: String,
	ISBN: String,
	imgLink: String,
	localizacion: String
});

var userSchema = new Schema({

    nombre : String,
    ciudad: String

});

module.exports = mongoose.model('Users', userSchema);
module.exports = mongoose.model('Pollen', pollenSchema);