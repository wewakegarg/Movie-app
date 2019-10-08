let mongoose = require('mongoose');

/* define movie schema model */

let Schema = mongoose.Schema;
let MovieSchema = new Schema({
	title: String,
	overview : String,
	posterPath : String,
	voteAverage: String,
	originalLanguage: String,
	releaseDate: String,

});

module.exports = mongoose.model('movie', MovieSchema);