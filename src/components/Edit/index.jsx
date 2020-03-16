import React, {useEffect, useState} from 'react';
import {RECIPES_CATEGORIES} from "../../constants";
import { Link, useParams } from 'react-router-dom';

const Edit = () => {
  const { recipeId: id } = useParams();
  const edit = ({name, short, long, category}) => {
    fetch(`http://localhost:3001/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        shortDesc: short,
        longDesc: long,
        category,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  };
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
      <form onSubmit={(e) => {
        e.persist();
        e.preventDefault();
        const {target: {elements: {name, short, long, category}}} = e;
        edit({
          name: name.value,
          short: short.value,
          long: long.value,
          category: category.value,
        });
      }}>
        <input type="text" name="name" defaultValue={recipe.name}/>
        <input type="text" name="short" defaultValue={recipe.shortDesc}/>
        <textarea name="long" defaultValue={recipe.longDesc}/>
        <select name="category" id="category" defaultValue={recipe.category}>
          {RECIPES_CATEGORIES.map(t => (
            <option value={t} key={t}>
              {t}
            </option>
          ))}
        </select>
        <input type="submit" value="submit"/>
      </form>
      <Link to="/" >Back </Link>
    </div>
  )
};

export default Edit;