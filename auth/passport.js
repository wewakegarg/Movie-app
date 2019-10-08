// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../models/user');

const { validPassword } = require('./../utills/validpassword');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function(req, email, password, done) {
        console.log('inside function');
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
          User.findOne({ 'username' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err){
                  return done(err);
                }

                // if no user is found, return the message
                if (!user) {
                  return done(null, false);
                }

                if (!validPassword(user.password, password)){
                  return done(null, false);
                }

                // all is well, return user
                else {
                  return done(null, user);
                }
              });
        });

      }));

  };