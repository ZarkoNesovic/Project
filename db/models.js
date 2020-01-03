var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: String, //email
	password: String,
	email: String,
	channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'channelData' }],
});
var channelSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	channelName: { type: String },
	description: String,
	readApiKey: String,
	writeApiKey: String,
	channelData: [{ type: mongoose.Schema.Types.ObjectId, ref: 'value' }]
})
var valueSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	channelUser: { type: mongoose.Schema.Types.ObjectId, ref: 'channelData' },
	value: String,
	fieldValue: String,
	time: String
})
value = mongoose.model('value', valueSchema);
User = mongoose.model('User', userSchema);
channel = mongoose.model('channelData', channelSchema);
module.exports = { User, channel, value }