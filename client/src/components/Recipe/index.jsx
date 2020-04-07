import React, {useState, useEffect} from 'react';
import {useParams,useHistory, Link} from 'react-router-dom';
import './styles.css';
import {deleteRecipe} from "../../services";
import {API_URL} from "../../constants";

const Recipe = () => {
  const { recipeId: id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState(null);
  const fetchData = async () => {
    const result = await fetch(`${API_URL}/recipes/${id}`);
    const recipe = await result.json();
    setRecipe(recipe)
  };
  useEffect(() => {
    fetchData();
  }, []);

  if(!recipe){
    return null;
  }
  return (
    <div className="recipe_info">
      <div>Name --- {recipe.name}</div>
      <div>Category --- {recipe.category}</div>
      <div>Short desc --- {recipe.shortDesc}</div>
      <div>Desciription</div>
      <div>{recipe.longDesc}</div>
      <div className="buttons">
        <Link to={`/recipes/${id}/edit`}>Edit</Link>
        <button onClick={() => {
          deleteRecipe(id);
          history.push('/recipes');
        }}>Delete</button>
      </div>
    </div>
  )
};

export default Recipe;
