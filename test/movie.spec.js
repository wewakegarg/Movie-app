const passport = require('passport');
const assert = require('chai').assert;
const request= require('supertest');
const sinon = require('sinon');
let app;
const movieModel = require('./../models/movie');
const userModel = require('./../models/user');
const auth = require('./../utills/isAuthenticate');
const data = [
{
	"_id": "5ad97c4654240a235896421d",
	"title": "Fifty Shades Freed",
	"overview": "Determined to prove herself, Officer Judy Hopps, the first bunny on Zootopia's police force, jumps at the chance to crack her first case - even if it means partnering with scam-artist fox Nick Wilde to solve the mystery.",
	"posterPath": "/sM33SANp9z6rXW8Itn7NnG1GOEs.jpg",
	"voteAverage": "7.7",
	"originalLanguage": "en",
	"releaseDate": "2016-02-11",
	"__v": 0
}
];
const addData = [
{
	"title": "Fifty Shades Freed",
	"overview": "Determined to prove herself, Officer Judy Hopps, the first bunny on Zootopia's police force, jumps at the chance to crack her first case - even if it means partnering with scam-artist fox Nick Wilde to solve the mystery.",
	"posterPath": "/sM33SANp9z6rXW8Itn7NnG1GOEs.jpg",
	"voteAverage": "7.7",
	"originalLanguage": "en",
	"releaseDate": "2016-02-11",
}
];
const onDelete = { ok: 1, n: 1 };

/* stub for movie test case */
const modelStubFindMovies = sinon.stub(movieModel,'find');
const modelStubPersistMovie = sinon.stub(movieModel.prototype,'save');
const modelStubUpdateMovie = sinon.stub(movieModel,'findOneAndUpdate');
const modelStubDeleteMovie = sinon.stub(movieModel,'deleteOne');

/* to pass isAuthentication*/
before(function() {
	sinon.stub(auth, 'isAuthenticated')
	.callsFake(function(req, res, next) {
		next();
	});
	app = require('./../app');
});

/* for get all popular movies*/
describe('find all popular movies', function(){
	before(function(done){
		modelStubFindMovies.yields(null, data);
		done();
	});
	it('Should handle to search movie request', function(done) {
		request(app)
		.get('/api/movie')
		.end(function(err,res){
			if(err) done(err);
			assert.deepEqual(res.body,data);
			done();
		});
	});
	 after(function(done){
    modelStubFindMovies.reset();
    done();
  });
});

	/* for add popular movie to favourites*/
describe('add movie to favourites',function(){
	before(function(done){
		modelStubPersistMovie.yields(null,data);
		done();
	});
	it('Should handle to add movie request', function(done){
		request(app)
		.post('/api/movie')
		.send(addData)
		.end(function(err,res){
			if(err) done(err);
			assert.deepEqual(res.text,'Favourite movie data successfully saved');
			done();
		});
	});
	 after(function(done){
    modelStubPersistMovie.reset();
    done();
  });
});


/* for update fvourite movie */

describe('update favourite movie',function(){
	before(function(done){
		modelStubUpdateMovie.withArgs({_id:'5ad97c4654240a235896421d'}).yields(null,data);
		done();
	});
	it('Should handle to update movie request', function(done){
		request(app)
		.put('/api/movie/5ad97c4654240a235896421d')
		.send(addData)
		.end(function(err,res){
			if(err) done();
			assert.deepEqual(res.text,'Favourite movie data successfully updated');
			done();
		});
	});
});

/* delete favourite movie */
describe('delete favourite movie',function(){
	before(function(done){
		modelStubDeleteMovie.withArgs({_id:'5ad97c4654240a235896421d'}).yields(null,onDelete);
		done();
	});
	it('should handle to delete movie request', function(done){
		request(app)
		.delete('/api/movie/5ad97c4654240a235896421d')
		.end(function(err,res){
			if(err) done(err);
			assert.deepEqual(res.text,'Favourite movie data successfully deleted');
			done();
		})
	})
})
