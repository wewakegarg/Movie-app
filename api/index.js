const router = require('express').Router();

router.use('/user',require('./modules/user'));
router.use('/movie', require('./modules/movie'));

module.exports = router;