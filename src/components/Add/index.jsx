import React from 'react';
import {RECIPES_CATEGORIES} from "../../constants";
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';

const Add = () => {
  const history = useHistory();
  const createNew = async ({name, short, long, category}) => {
    return await fetch('http://localhost:3001/recipes', {
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
    <div>
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
        <input type="text" name="name" placeholder="name"/>
        <input type="text" name="short" placeholder="short desc"/>
        <textarea name="long" placeholder="long desc"/>
        <select name="category" id="category">
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

export default Add;