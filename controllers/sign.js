var eventproxy = require('eventproxy');
var UserModel = require('../models/user');

exports.showSignup = function(req, res) {
	res.render('sign/signup', {error: '', success: ''});
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

	var isEmpty = hasEmptyInfo.some(function(item) {
		return item === '';
	});

	var isPassDiff = (pass !== re_pass);

	if(isEmpty || isPassDiff) {
		ep.emit('info_error', 'Registration info has error');
		return;
	}

	//Save to Database
	UserModel.getUserBySignupInfo(username, email, function(err, users) {
		if(err) {
			ep.emit('info_error', 'Get User Data Failed!');
			return;
		}
		console.log(users);
		if(users.length > 0) {
			ep.emit('info_error', 'Username or Email already be taken!');
			return;
		}
		UserModel.addUser({username: username, pass: pass, email: email}, function(err, result) {
			console.log('12345');
			if(result) {
				res.render('sign/signup', {success: 'Success! Congratulations!'});
			} else {
				ep.emit('info_error', 'Registration Failed!');
			}
		});
	});
};

exports.showSignin = function(req, res) {
	res.render('sign/signin');
};

exports.signin = function(req, res) {
	var username = req.body.uname;
	var pass = req.body.upass;

	if(!username || !pass) {
		res.status(422);
		return res.render('sign/signin', {error: 'Missing information!'});
	}

	UserModel.getUser(username, pass, function(err, user) {
		if(user) {
			req.session.user = user;
			res.render('sign/signin', {success: 'Login Success'});
		} else {
			res.status(422);
			res.render('sign/signin', {error: 'Wrong Username or Password!'});
		}
	});
};

exports.signout = function(req, res) {
	req.session.destroy();
	res.redirect('/');
};