import React, {useEffect, useState} from 'react';
import {API_URL, RECIPES_CATEGORIES} from "../../constants";
import { Link, useParams } from 'react-router-dom';
import {fetchAuth} from "../../services";
import './styles.css';

const Edit = () => {
  const { recipeId: id } = useParams();
  const edit = ({name, short, long, category}) => {
    fetchAuth(`${API_URL}/recipes/${id}`, {
      method: 'PATCH',
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
    const result = await fetch(`${API_URL}/recipes/${id}`);
    const recipe = await result.json();
    setRecipe(recipe);
  };
  useEffect(() => {
    fetchData();
  }, []);
  if(!recipe){
    return null;
  }
  return (
    <div className="recipe_form">
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
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" defaultValue={recipe.name}/>
        </div>
        <div>
          <label htmlFor="short">Short description</label>
          <input type="text" name="short" defaultValue={recipe.shortDesc}/>

        </div>
        <div>
          <label htmlFor="long">Description</label>
          <textarea name="long" defaultValue={recipe.longDesc}/>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select name="category" id="category" defaultValue={recipe.category}>
            {RECIPES_CATEGORIES.map(t => (
              <option value={t} key={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <input type="submit" value="submit"/>
      </form>
      <Link to="/" >Back </Link>
    </div>
  )
};

export default Edit;
