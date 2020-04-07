const likeRepository = require('./like.repository');

class LikeService {
  likeRecipe(user, recipeId) {

    return likeRepository.add({
      authorId: user._id,
      recipeId,
    });
  }
  dislikeRecipe(user, recipeId) {

    return likeRepository.delete({authorId: user._id, recipeId});
  }
}

module.exports = new LikeService();
