import React from 'react';
import {API_URL, RECIPES_CATEGORIES} from "../../constants";
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import {fetchAuth} from "../../services";

const Add = () => {
  const history = useHistory();
  const createNew = async ({name, short, long, category}) => {
    return await fetchAuth(`${API_URL}/recipes`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        shortDesc: short,
        longDesc: long,
        category,
        createDate: moment(),
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  };
  return (
    <div className="recipe_form">
      <form onSubmit={async (e) => {
        e.persist();
        e.preventDefault();
        const {target: {elements: {name, short, long, category}}} = e;
        await createNew({
          name: name.value,
          short: short.value,
          long: long.value,
          category: category.value,
        });
        history.push('/recipes');
      }}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label htmlFor="short">Short description</label>
          <input type="text" name="short" />

        </div>
        <div>
          <label htmlFor="long">Description</label>
          <textarea name="long" />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select name="category" id="category" >
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

export default Add;
