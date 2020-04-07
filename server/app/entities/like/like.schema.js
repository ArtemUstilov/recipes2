const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Recipe = new mongoose.Schema({
	authorId: ObjectId,
	recipeId: ObjectId,
}, {
	versionKey: false,
	collection: 'Likes',
});

module.exports = mongoose.model('Like', Recipe);
