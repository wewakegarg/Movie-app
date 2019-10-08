const userService = require('./user.service');
const logger = require('../../../logger');

/* handle to add favourite movie from db*/
function register(req,res){
	logger.debug('inside register method');
	try {
		let userData=req.body;
		userService.register(userData).then((response)=>{
			logger.debug('Inside register on success response');
			logger.info(response.message);
			res.status(response.status).send(response.message);
		}, (err)=>{
			logger.error('Inside register on error response');
			res.status(err.status).send(err);
		})
	} catch (err) {
		logger.error('Unexpected error on userService.register method', err);
		res.send({message: 'Failed to complete request'});
	}
}

module.exports = {
	register
}