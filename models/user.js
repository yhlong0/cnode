var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/node_club');

var UserSchema = new mongoose.Schema({
	username: String,
	pass: String,
	email: String
});

UserSchema.statics.getUserBySignupInfo = function(username, email, callback) {
	console.log(username);
	console.log(email);
	//var cond = ['$or', {username: username}, {email: email}];
	this.find({username: username }, callback);
};

UserSchema.statics.addUser = function(user, callback) {
	console.log(user);
	this.create(user, callback);
};

UserSchema.statics.getUser = function(username, pass, callback) {
	this.findOne({username: username, pass: pass}, callback);
};

module.exports = mongoose.model('User', UserSchema);
