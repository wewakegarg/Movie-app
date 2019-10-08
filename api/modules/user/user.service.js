const logger = require('./../../../logger');
const User = require('./../../../models/user');

/* handle to register user into database*/
function register(data) {
	logger.debug('Inside register service method');
	return new Promise((resolve,reject)=>{
		let newUser = new User();
		let userData = data;
		userData['password']= newUser.generateHash(userData.password);
		let user= new User(userData);
		user.save(function(err,success){
			if(err) {
				logger.error(err);
				reject({message:'Internal server error', status:500});
			} else {
				logger.info('user successfully registered')
				resolve({ message:'user successfully registered', status: 202});
			}
		})
})
}

module.exports = {
	register
}

