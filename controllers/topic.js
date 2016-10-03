var Validator = require('validator');
var TopicModel = require('../models/topic');

exports.showCreate = function(req, res) {
	res.render('topic/create', {error:'', success:''});
};

exports.create = function(req, res) {
	//Get User Data
	var tab = Validator.trim(req.body.tab_value);
	var title = Validator.trim(req.body.titlename);
	var content = Validator.trim(req.body.t_content);

	//Data Validation
	var hasEmptyInfo = [tab, title, content].some(function(item) {
		return item === '';
	});
	if(hasEmptyInfo) {
		res.status(422);
		return res.render('topic/create', {error: 'Missing information', success:''});
	}

	//Save to Database
	var topicData = {
		title: title,
		content: content,
		tab: tab,
		username: req.session.user.username,
		insertTime: Date.now()
	};
	TopicModel.addTopic(topicData, function(err, result) {
		return res.render('topic/create', {success: 'Created Topic Successful!', error:''});
	});
};