var topicModel = require('../models/topic');
var eventproxy = require('eventproxy');

exports.index = function(req, res) {
	var page = parseInt(req.query.page) || 1;
	page = page > 0 ? page : 1;
	var tab = req.query.tab || 'all';
	var query = {}; 
	if(tab !== 'all') {
		query.tab = tab;
	}
	var ep = new eventproxy();
	count = 10;
	var option = {skip: (page-1) * count, limit: count, sort: '-insertTime'};
	
	topicModel.getToics(query, option, function(err, topics) {
		ep.emit('topic_data_ok', topics);
	});

	topicModel.count(query, function(err, allCount) {
		var pageCount = Math.Ceil(allCount/count);
		ep.emit('page_count_ok', pageCount);
	});

	ep.all('topic_data_ok', 'page_count_ok', function(topics, pageCount) {
		res.render('index', {topics: topics, tab: tab, page: page, pageCount: pageCount});
	});
};