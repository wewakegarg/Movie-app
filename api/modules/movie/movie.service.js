const logger = require('./../../../logger');
const Movie = require('./../../../models/movie');


/* handle to get all favourite movie form database */
function getFavMovies() {
	logger.debug('Inside getFavMovies service method');
	return new Promise((resolve,reject)=>{
		Movie.find({},function(err, movies) {
			if(err) {
				logger.error(err);
				reject({message:'Internal server error', status:500});
			} else {
				logger.info('Favourite movie data successfully send');
				resolve({data:movies, message:'Favourite movie data successfully send', status: 201})
			}
		})
	})
}

/* handle to add favourite movie into database*/
function persistFavMovie(movieData) {
	logger.debug('Inside persistFavMovie service method');
	return new Promise((resolve,reject)=>{
		let favMovieData = movieData;
		let movie= new Movie(favMovieData);
		movie.save(function(err,success){
			if(err) {
				logger.error(err);
				reject({message:'Internal server error', status:500});
			} else {
				logger.info('Favourite movie data successfully saved')
				resolve({ message:'Favourite movie data successfully saved', status: 202});
			}
		})
})
}

/* handle to update favourite movie into database*/
function updateFavMovie(movieData, movieId) {
	logger.debug('Inside updateFavMovie service method');
	return new Promise((resolve,reject)=>{
	let favMovieId = movieId;
	let data = movieData;
	Movie.findOneAndUpdate({ _id: favMovieId }, movieData, {new: true}, function(err,updatedFavMovie){
		if(err) {
			logger.error(err);
				reject({message:'Internal server error', status:500});
			} else {
					logger.info('Favourite movie data successfully updated')
				resolve({data: updatedFavMovie,message:'Favourite movie data successfully updated', status: 200});
			}
	});
});
}

/* handle to delete favourite movie into database*/
function deleteFavMovie(movieId) {
	logger.debug('Inside deleteFavMovie service method');
	return new Promise((resolve,reject)=>{
		let id = movieId;
		Movie.deleteOne({_id: id}, function(err, success){
			if(err) {
			logger.error(err);
				reject({message:'Internal server error', status:500});
			} else {
					logger.info('Favourite movie data successfully deleted')
				resolve({message:'Favourite movie data successfully deleted', status: 200});
			}
		}) 
	})
}

module.exports = {
	getFavMovies,
	persistFavMovie,
	updateFavMovie,
	deleteFavMovie
}