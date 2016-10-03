var express = require('express');
var router = express.Router();
var signController = require('../controllers/sign');
var topicController = require('../controllers/topic');
var auth = require('../middlewares/auth');

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

/* Show Topic page */
router.get('/topic/create', auth.requireLogin, topicController.showCreate);

/* Handle user submit topic info */
router.post('/topic/create', auth.requireLogin, topicController.create);


module.exports = router;

