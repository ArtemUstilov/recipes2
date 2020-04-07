const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Recipe = new mongoose.Schema({
	name: String,
	category: String,
	createDate: String,
	shortDesc: String,
	longDesc: String,
	authorId: ObjectId,
}, {
	versionKey: false,
	collection: 'Recipe',
});

module.exports = mongoose.model('Recipe', Recipe);
