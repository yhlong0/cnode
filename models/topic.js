var mongoose = require('../mongoose_helper').mongoose;

var TopicSchema = new mongoose.Schema({
	title: String,
	content: String,
	tab: String,
	username: String,
	insertTime: Date
});

TopicSchema.statics.addTopic = function(topic, callback) {
	this.create(topic, callback);
};

module.exports = mongoose.model('Topic', TopicSchema);