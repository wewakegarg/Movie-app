const passport = require('passport');
const assert = require('chai').assert;
const request= require('supertest');
const sinon = require('sinon');
let app;
const userModel = require('./../models/user');
const auth = require('./../utills/isAuthenticate');

/* stub data for user test case */
const modelStubLoginUser = sinon.stub(userModel,'findOne');
const modelStubRegisterUser = sinon.stub(userModel.prototype,'save');

const registerData ={
	"id" : "5ae6d3fb1c23b335a4a16241",
	"username" : "rohit@gmail.com",
	"password" : "$2a$08$3UQU9Aac/KyA5hrW613b0.FgrgU3NWsh6/KwGylYviQe8q6HEpUI2",
	"__v" : 0
};

const user = {
	"username":"rohit@gmail.com",
	"password":'123456'
};

const negativeUser = {
	"username":"rohit@gmail.com",
	"password":'123456768'
};

/* to pass isAuthentication*/
before(function() {
	app = require('./../app');
});

/* for login user*/
describe('Login User', function(){
	before(function(done){
		modelStubLoginUser.withArgs({username : "rohit@gmail.com"}).yields(null,registerData);
		done();
	})
	it('it should handle login request', function(done){
		request(app)
		.post('/api/user/login')
		.expect(200)
		.send(user)
		.end(function(err,res){
			if(err) done(err);
			assert.equal(res.text,'authenticated');
			done();
		})
	})
})


/* Negative test case for login user*/
describe('Negative Login Test Case by incorrect username', function(){
	before(function(done){
		modelStubLoginUser.withArgs({username : "amit@gmail.com"}).yields(null,null);
		done();
	})
	it('it should handle login request', function(done){
		request(app)
		.post('/api/user/login')
		.expect(401)
		.send(negativeUser)
		.end(function(err,res){
			if(err) done(err);
			assert.equal(res.text,'Unauthorized');
			done();
		})
	})
})

/* Negative test case for user login*/
describe('Negative test case for incorrect password ', function(){
	before(function(done){
		modelStubLoginUser.withArgs({username:"rohit@gmail.com"}).yields(null,registerData);
		done();
	});
	it('it should handle login request',function(done){
		request(app)
		.post('/api/user/login')
		.send(negativeUser)
		.end(function(err,res){
			if(err) done(err);
			assert.equal(res.text,'Unauthorized');
			done();
		})
	})
})

/* for user registration*/
describe('Register user',function(){
	before(function(done){
		modelStubRegisterUser.yields(null,registerData);
		done();
	})

	it('it should handle user register request', function(done){
		request(app)
		.post('/api/user/register')
		.send(user)
		.end(function(err,res){
			if(err) done(err);
			assert.equal(res.text,'user successfully registered');
			done();
		})
	})
})