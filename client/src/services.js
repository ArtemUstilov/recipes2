import {API_URL} from "./constants";

const queryParam = (param, paramName) => {
  if (!param) {
    return '';
  }
  return `${paramName}=${param}`;
};

const sortParam = (param) => {
  if (!param) {
    return '';
  }
  return `isDescSort=${param}`;
};

const nameParam = (param) => {
  if (!param) {
    return '';
  }
  return `name=${param}`;
};

export const loadRecipes = async (name, category) => {
  const categoryParam = queryParam(category, 'category');
  const sort = sortParam(localStorage.getItem('sort'));
  const filter = nameParam(name);
  const data = await fetch(`${API_URL}/recipes?${[categoryParam, sort, filter].filter(Boolean).join('&')}`);
  return await data.json();
};

export const loadRecipesAuth = async (name, category) => {
  const categoryParam = queryParam(category, 'category');
  const sort = sortParam(localStorage.getItem('sort'));
  const filter = nameParam(name);
  const data = await fetchAuth(`${API_URL}/recipes/authorized?${[categoryParam, sort, filter].filter(Boolean).join('&')}`);
  return await data.json();
};

export const loadRecipesLiked = async (name, category) => {
  const categoryParam = queryParam(category, 'category');
  const sort = sortParam(localStorage.getItem('sort'));
  const filter = nameParam(name);
  const data = await fetchAuth(`${API_URL}/recipes/liked?${[categoryParam, sort, filter].filter(Boolean).join('&')}`);
  return await data.json();
};

export const loadRecipesMine = async (name, category) => {
  const categoryParam = queryParam(category, 'category');
  const sort = sortParam(localStorage.getItem('sort'));
  const filter = nameParam(name);
  const data = await fetchAuth(`${API_URL}/recipes/mine?${[categoryParam, sort, filter].filter(Boolean).join('&')}`);
  return await data.json();
};

export const deleteRecipe = async id => {
  return await fetchAuth(`${API_URL}/recipes/${id}`, { method: 'DELETE'});
};

export const fetchAuth = (url, options={}, ...other) => {
  const token = localStorage.getItem('token');
  return fetch(url, {...options, headers: { ...(options.headers || {}), 'Authorization': `Bearer ${token}`}, ...other});
};

export const userLoggedIn = () => {
  return localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined';
}
