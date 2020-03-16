import React, {useState, useEffect} from 'react';
import {useParams,useHistory, Link} from 'react-router-dom';
import './styles.css';
import {deleteRecipe} from "../../services";

const Recipe = () => {
  const { recipeId: id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState(null);
  const fetchData = async () => {
    const result = await fetch(`http://localhost:3001/recipes?id=${id}`);
    const recipes = await result.json();
    if(!recipes.length){
      return;
    }
    setRecipe(recipes[0])
  };
  useEffect(() => {
    fetchData();
  }, []);

  if(!recipe){
    return null;
  }
  return (
    <div>
      <div>{recipe.name}</div>
      <div>{recipe.category}</div>
      <div>{recipe.shortDesc}</div>
      <div>{recipe.longDesc}</div>
      <Link to={`/recipes/${id}/edit`}>Edit</Link>
      <button onClick={() => {
        deleteRecipe(id);
        history.push('/recipes');
      }}>Delete</button>
    </div>
  )
};

export default Recipe;