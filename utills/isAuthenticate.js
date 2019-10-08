let auth = {};
auth.isAuthenticated = (req,res,next)=> {
	if(req.isAuthenticated()){
		next();
	} else {
		res.send('unauthorised user');
	}
}

module.exports = auth;

