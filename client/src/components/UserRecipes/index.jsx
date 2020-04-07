import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {API_URL, RECIPES_CATEGORIES} from '../../constants';
import './styles.css';
import {
  deleteRecipe,
  fetchAuth,
  loadRecipes,
  loadRecipesAuth,
  loadRecipesLiked,
  loadRecipesMine,
  userLoggedIn
} from "../../services";

const SORT = [
  {value: 'desc', label: 'New first'},
  {value: 'asc', label: 'Old first'},
];

const RecipesLoggedIn = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipesLiked, setRecipesLiked] = useState([]);
  const [recipesMine, setRecipesMine] = useState([]);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const fetchData = async () => {
    setRecipes(await loadRecipesAuth(name, category));
    setRecipesMine(await loadRecipesMine(name, category));
    setRecipesLiked(await loadRecipesLiked(name, category));
  };
  useEffect(() => {
    fetchData();
  }, [category, name]);
  const history = useHistory();
  if(!userLoggedIn()){
    // history.push('/recipes');
  }
  const deleteData = id => async () => {
    await deleteRecipe(id);
    fetchData();
  };
  const likeRecipe = id => async () => {
    await fetchAuth(`${API_URL}/like/${id}`, { method: 'POST'});
    fetchData();
  };
  const dislikeRecipe = id => async () => {
    await fetchAuth(`${API_URL}/like/${id}`, { method: 'DELETE'});
    fetchData();
  };
  return (
    <div>
      <div className="params">
        <div>
          <label htmlFor="category">Category</label>
          <select name="category" id="category" onChange={e => setCategory(e.target.value)}>
            <option value="">Not set</option>
            {RECIPES_CATEGORIES.map(t => (
              <option value={t} key={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" onChange={e => setName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="sort">Sort</label>
          <select name="sort" id="sort" onChange={e => {
            localStorage.setItem('sort', e.target.value);
            fetchData();
          }}
                  defaultValue={localStorage.getItem('sort')}>
            {SORT.map(t => (
              <option value={t.value} key={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Link to="add">
            ADD NEW
          </Link>
        </div>
      </div>
      <div className="list">
        <div className="recipe header">
          <div>NAME</div>
          <div>CATEGORY</div>
          <div>SHORT DESC</div>
          <div>CREATE DATE</div>
        </div>
        {(recipes || []).map(recipe => (
          <div key={recipe._id} className="recipe">
            <div>{recipe.name}</div>
            <div>{recipe.category}</div>
            <div>{recipe.shortDesc}</div>
            <div>{recipe.createDate}</div>
            <div>{recipe.likes.length ? 'LIKED':''}</div>
            <div>
              {recipe.likes.length > 0 ? (
                <button onClick={dislikeRecipe(recipe._id)}>Dislike</button>
              ) : (
                <button onClick={likeRecipe(recipe._id)}>Like</button>
              )}
            </div>
          </div>
        ))}
        <h3>MINE</h3>
        {(recipesMine || []).map(recipe => (
          <div key={recipe._id} className="recipe">
            <div>{recipe.name}</div>
            <div>{recipe.category}</div>
            <div>{recipe.shortDesc}</div>
            <div>{recipe.createDate}</div>
            <div>{recipe.likes.length ? 'LIKED':''}</div>
            <div>
              <Link to={`/recipes/${recipe._id.toString()}`}>Info</Link>
              <Link to={`/recipes/${recipe._id.toString()}/edit`}>Edit</Link>
              <button onClick={deleteData(recipe._id)}>Delete</button>
            </div>
          </div>
        ))}
        <hr/>
        <h3>LIKED</h3>
        {(recipesLiked || []).map(recipe => (
          <div key={recipe._id} className="recipe">
            <div>{recipe.name}</div>
            <div>{recipe.category}</div>
            <div>{recipe.shortDesc}</div>
            <div>{recipe.createDate}</div>
            <div>{recipe.likes.length ? 'LIKED':''}</div>
            <div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default RecipesLoggedIn;
