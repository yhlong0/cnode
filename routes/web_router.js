var express = require('express');
var router = express.Router();
var signController = require('../controllers/sign');

/* Show home page. */
router.get('/', function(req, res) {
	res.render('home');
});

/* Show registration page. */
router.get('/signup', signController.showSignup);

/* Submit registration page. */
router.post('/signup', signController.signup);

/* Show signin page. */
router.get('/signin', signController.showSignin);

/* Submit signin page. */
router.post('/signin', signController.signin);

/* Signout. */
router.get('/signout', signController.signout);

module.exports = router;
 