let mongoose = require('mongoose');
const { dbConfig }  = require('../config').appConfig;
const logger = require('../logger'); 

/* create mongo connection */
function createMongoConnection() {
	mongoose.connect(dbConfig.mongoUrl);
}

/* get mongo connection object */
function getMongoConnection() { 
	return mongoose.connection;
}

/* event listner for mongo error event */
function onError(err) {
	logger.error('Error in database connection', err);
}

/* event listner for mongo "open" event*/
function onSuccess() {
	logger.info('connected to mongo database');
}

module.exports = {
	createMongoConnection,
	getMongoConnection,
	onError,
	onSuccess
}