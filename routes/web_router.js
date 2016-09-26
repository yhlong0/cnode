var express = require('express');
var router = express.Router();

/* Show registration page. */
router.get('/signup', function(req, res) {
  res.render('sign/signup');
});

/* Submit registration page. */
router.post('/signup', function(req, res) {
 
});

/* Show signin page. */
router.get('/signin', function(req, res) {
  res.render('sign/signin');
});

/* Submit signin page. */
router.post('/signin', function(req, res) {
  
});

/* Signout. */
router.post('/signout', function(req, res) {

});

module.exports = router;
