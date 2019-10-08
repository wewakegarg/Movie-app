let express = require('express');
let app = express();
let appService = require('./app.service');


appService.connectToDatabase();
appService.setAppMiddleware(app);
appService.setPassport(app);
appService.apiSetUp(app);

module.exports = app;