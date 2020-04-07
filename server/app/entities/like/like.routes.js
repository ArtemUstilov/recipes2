const express = require('express');
const like = express.Router();
const likeService = require('./like.service');
const authenticateJWT = require('../../common/Authorization');

like.route('/:recipeId')
	.post(authenticateJWT,(req, res) => {
		likeService.likeRecipe(req.user, req.params.recipeId)
			.then(recipes => {
				res.send(recipes);
			})
			.catch(err => {
				console.log(err);
			})
	})
	.delete(authenticateJWT,(req, res) => {
			likeService.dislikeRecipe(req.user, req.params.recipeId)
				.then(recipes => {
					res.send(recipes);
				})
				.catch(err => {
					console.log(err);
				});
	});

module.exports = like;
