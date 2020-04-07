const recipeRepository = require('./recipe.repository');
const mongoose = require('mongoose');

class RecipeService {
  getNameRegex(name) {
    return {
      name: new RegExp(`.*${name || ''}.*`),
    };
  }

  async getAllRecipes(user={}, descSort, name, category) {
    console.log(user);
    return recipeRepository.agregate({
      createDate: descSort === 'desc' ? -1 : 1,
    }, [
      {
        $lookup: {
          from: "Likes",
          let: {id: "$_id"},
          as: "likes",
          pipeline: [
            {
              $match: {
                authorId: new mongoose.Types.ObjectId(user._id),
              }
            },
            {
              $match: {$expr:{$eq: ["$recipeId", "$$id"]}},
            }
          ]
        },
      },
      {
        $match: {
          ...this.getNameRegex(name),
          ...(category ? {category}:{})
        }
      }
    ]);
  }

  async getLikedRecipes(user, descSort, name, category) {

    return recipeRepository.agregate({
      createDate: descSort === 'desc' ? -1 : 1,
    }, [
      {
        $lookup: {
          from: "Likes",
          let: {id: "$_id"},
          as: "likes",
          pipeline: [
            {
              $match: {
                authorId: new mongoose.Types.ObjectId(user._id),
              }
            },
            {
              $match: {$expr:{$eq: ["$recipeId", "$$id"]}},
            }
          ]
        },
      },
      {
        $match: {
          ...this.getNameRegex(name),
          likes: {$exists: true, $not: {$size: 0}},
          ...(category ? {category}:{})
        }
      }
    ]);
  }

  async getMineRecipes(user, descSort, name, category) {


    return recipeRepository.agregate({
      createDate: descSort === 'desc' ? -1 : 1,
    }, [
      {
        $lookup: {
          from: "Likes",
          let: {id: "$_id"},
          as: "likes",
          pipeline: [
            {
              $match: {
                authorId: new mongoose.Types.ObjectId(user._id),
              }
            },
            {
              $match: {$expr:{$eq: ["$recipeId", "$$id"]}},
            }
          ]
        },
      },
      {
        $match: {
          ...this.getNameRegex(name),
          authorId: new mongoose.Types.ObjectId(user._id),
          ...(category ? {category}:{})
        },
      },
    ]);
  }

  getRecipeById(id) {
    return recipeRepository.findById(id);
  }

  addRecipe(user, recipe) {
    console.log(user);
    return recipeRepository.add({
      ...recipe,
      authorId: new mongoose.mongo.ObjectId(user._id),
    });
  }

  updateRecipe(id, recipe) {
    return recipeRepository.update({_id: id}, recipe);
  }

  deleteRecipe(id) {
    return recipeRepository.delete({_id: id});
  }
}

module.exports = new RecipeService();
