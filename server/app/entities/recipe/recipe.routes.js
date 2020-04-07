const express = require('express');
const recipe = express.Router();
const recipeService = require('./recipe.service');
const authenticateJWT = require('../../common/Authorization');

recipe.route('/authorized')
	.get(authenticateJWT, (req, res) => {
		recipeService.getAllRecipes(req.user, req.query.isDescSort, req.query.name, req.query.category)
			.then(recipes => {
				res.send(recipes);
			})
			.catch(err => {
				console.log(err);
			});
	});

recipe.route('/')
	.get((req, res) => {
		recipeService.getAllRecipes({}, req.query.isDescSort, req.query.name, req.query.category)
			.then(recipes => {
				res.send(recipes);
			})
			.catch(err => {
				console.log(err);
			});
	})
	.post(authenticateJWT, (req, res) => {
		recipeService.addRecipe(req.user, req.body)
			.then(recipe => {
				res.send(recipe);
			})
			.catch(err => {
				console.log(err);
			});
	});

recipe.route('/mine')
	.get(authenticateJWT,(req, res) => {
		recipeService.getMineRecipes(req.user, req.query.isDescSort, req.query.name, req.query.category)
			.then(recipes => {
				res.send(recipes);
			})
			.catch(err => {
				console.log(err);
			});
	});

recipe.route('/liked')
	.get(authenticateJWT,(req, res) => {
		recipeService.getLikedRecipes(req.user, req.query.isDescSort, req.query.name, req.query.category)
			.then(recipes => {
				res.send(recipes);
			})
			.catch(err => {
				console.log(err);
			});
	});

recipe.route('/:id', authenticateJWT)
	.patch(authenticateJWT,async (req, res) => {
		const recipe = await recipeService.getRecipeById(req.params.id);
		if(recipe.authorId !== req.user._id){
			res.sendStatus(403);
		}
		recipeService.updateRecipe(req.params.id, req.body)
			.then(recipe => {
				res.send(recipe);
			})
			.catch(err => {
				console.log(err);
			});
	})
	.get((req, res) => {
		recipeService.getRecipeById(req.params.id)
			.then(recipe => {
				res.send(recipe);
			})
			.catch(err => {
				console.log(err);
			});
	})
	.delete(authenticateJWT,async (req, res) => {
		const recipe = await recipeService.getRecipeById(req.params.id);
		if(recipe.authorId !== req.user._id){
			res.sendStatus(403);
		}
		recipeService.deleteRecipe(req.params.id)
			.then(recipe => {
				res.send(recipe);
			})
			.catch(err => {
				console.log(err);
			});
	});

module.exports = recipe;
