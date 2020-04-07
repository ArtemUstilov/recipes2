const recipe = require('../entities/recipe/recipe.routes');
const user = require('../entities/user/user.routes');
const like = require('../entities/like/like.routes');

module.exports = app => {
	app.use('/api/recipes', recipe);
	app.use('/api/user', user);
	app.use('/api/like', like);
};
