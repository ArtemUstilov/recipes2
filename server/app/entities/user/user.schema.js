const mongoose = require('mongoose');

const Recipe = new mongoose.Schema({
	login: String,
	password: String,
}, {
	versionKey: false,
	collection: 'User',
});

module.exports = mongoose.model('User', Recipe);
