const movieService = require('./movie.service');
const logger = require('../../../logger');


/* handle to get favourite movie from db*/
function getFavMovie(req,res){
	logger.debug('inside getFavMovie method');
	try {
		movieService.getFavMovies().then((response)=>{
			logger.debug('Inside get getfavMovies on success response');
			logger.info(response.message);
			res.status(response.status).send(response.data);
		}, (err)=>{
			logger.error('Inside get movies on error message');
			res.status(err.status).send(err);
		})
	} catch (err) {
		logger.error('Unexpected error on movieService.getfavMovies method', err);
		res.send({message: 'Failed to complete request'});
	}
}

/* handle to add favourite movie from db*/
function addFavMovie(req,res){
	logger.debug('inside adFavdMovie method');
	try {
		let movieData=req.body;
		movieService.persistFavMovie(movieData).then((response)=>{
			logger.debug('Inside persistFavMovie on success response');
			logger.info(response.message);
			res.status(response.status).send(response.message);
		}, (err)=>{
			logger.error('Inside persistFavMovie on error response');
			res.status(err.status).send(err);
		})
	} catch (err) {
		logger.error('Unexpected error on movieService.persistFavMovie method', err);
		res.send({message: 'Failed to complete request'});
	}
}

/* handle to update movie from db*/
function updateFavMovie(req,res){
	logger.debug('inside updateFavMovie method');
	try {
		let movieData = req.body;
		let movieId = req.params.movieId;
		movieService.updateFavMovie(movieData,movieId).then((response)=>{
			logger.debug('Inside updateFavMovie on success response');
			logger.info(response.message);
			res.status(response.status).send(response.message);
		}, (err)=> {
			logger.error('Inside updateFavMovie on error response',err);
			res.status(err.status).send(err);
		})
	} catch (err) {
		logger.error('Unexpected error on movieService.updateFavMovie method', err);
		res.send({message: 'Failed to complete request'});
	}
}
/* handle to delete fav movie from db*/
function deleteFavMovie(req,res){
	logger.debug('inside deleteMovie method');
	try {
		let movieId = req.params.movieId;
		movieService.deleteFavMovie(movieId).then((response)=>{
			logger.debug('Inside deleteFavMovie on success response');
			logger.info(response.message);
			res.status(response.status).send(response.message);
		}, (err)=> {
			logger.error('Inside deleteFavMovie on error response');
			res.status(err.status).send(err);
		})
	} catch (err) {
		logger.error('Unexpected error on movieService.deleteFavMovie method', err);
		res.send({message: 'Failed to complete request'});
	}
}

module.exports = {
	getFavMovie,
	addFavMovie,
	updateFavMovie,
	deleteFavMovie
}
