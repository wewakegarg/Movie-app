const router = require('express').Router();
const userCtrl = require('./user.controller');
const passport = require('passport');

/* api to register user */ 
router.post('/register', userCtrl.register);

/* api to login user */
router.post('/login', passport.authenticate('local-login'), function(req,res){
	res.send('authenticated');
});


router.get('/logout',(req,res)=>{
	req.logout();
	res.send('User successfully logout');

})

module.exports = router;