exports.requireLogin = function(req, res, next) {
	console.log(req.session.user);
	if(req.session.user) {
		return next();
	}
	res.status(402);
	res.redirect('/signin');
};