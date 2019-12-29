var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

	username: String, //email
	password: String,
	email: String,
	channels: []

});

var channelDataSchema = mongoose.Schema({
	channelId: String,
	channelName:{type:String,default:'default'},
	description:String,
	readApiKey: String,
	writeApiKey: String,
	channelData: [{
		time: String,
		value: [{ field: String, fieldValue: Number }]
	}]
})



User = mongoose.model('User', userSchema);
channelData = mongoose.model('channelData', channelDataSchema);



module.exports = { User, channelData }