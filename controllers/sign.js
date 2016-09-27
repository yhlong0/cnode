var eventproxy = require('eventproxy');
var UserModel = {};

exports.showSignup = function(req, res) {
	res.render('sign/signup');
};

exports.signup = function(req, res) {
	//Get User Data
	var username = req.body.loginname;
	var pass = req.body.pass;
	var re_pass = req.body.re_pass;
	var email = req.body.email;
	var ep = new eventproxy();

	ep.on('info_error', function(msg) {
		res.status(422);
		res.render('sign/signup', {error: msg});
	});

	//Data Validation
	var hasEmptyInfo = [username, pass, re_pass, email];

	hasEmptyInfo.some(function(item) {
		return item === '';
	});

	var isPassDiff = (pass !== re_pass);

	if(hasEmptyInfo || isPassDiff) {
		ep.emit('info_error', 'Registration info has error');
		return;
	}

	//Save to Database
	UserModel.getUserBySignupInfo(username, email, function(err, users) {
		if(err) {
			ep.emit('info_error', 'Get User Data Failed!');
			return;
		}
		if(users.length > 0) {
			ep.emit('info_error', 'Username or Email already be taken!');
			return;
		}
		UserModel.addUser({username: username, pass: pass, email: email}, function(err, result) {
			if(result) {
				res.render('sign/signin', {success: 'Success! Congratulations!'});
			} else {

			}
		});
	});

exports.showSignin = function(req, res) {
	res.render('sign/signin');
};

exports.signin = function(req, res) {
	
};

exports.signout = function(req, res) {
	
};