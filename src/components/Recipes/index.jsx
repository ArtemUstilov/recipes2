import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {RECIPES_CATEGORIES} from '../../constants';
import './styles.css';
import {deleteRecipe, loadRecipes} from "../../services";

const SORT = [
  {value: 'desc', label: 'New first'},
  {value: 'asc', label: 'Old first'},
];

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const fetchData = async () => {
    setRecipes(await loadRecipes(name, category));
  };
  const deleteData = id => async () => {
    await deleteRecipe(id);
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, [category, name]);
  return (
    <div>
      <div className="params">
        <div>
          <label htmlFor="category">Category</label>
          <select name="category" id="category" onChange={e => setCategory(e.target.value)}>
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
          <div>ID</div>
          <div>NAME</div>
          <div>CATEGORY</div>
          <div>SHORT DESC</div>
          <div>CREATE DATE</div>
        </div>
        {(recipes || []).map(recipe => (
          <div key={recipe.id} className="recipe">
            <div>{recipe.id}</div>
            <div>{recipe.name}</div>
            <div>{recipe.category}</div>
            <div>{recipe.shortDesc}</div>
            <div>{recipe.createDate}</div>
            <div>
              <Link to={`recipes/${recipe.id.toString()}`}>Info</Link>
              <Link to={`recipes/${recipe.id.toString()}/edit`}>Edit</Link>
              <button onClick={deleteData(recipe.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Recipes;