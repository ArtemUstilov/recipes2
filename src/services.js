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
  return `_sort=createDate&_order=${param}`;
};

const nameParam = (param) => {
  if (!param) {
    return '';
  }
  return `name_like=${param}`;
};

export const loadRecipes = async (name, category) => {
  const categoryParam = queryParam(category, 'category');
  const sort = sortParam(localStorage.getItem('sort'));
  const filter = nameParam(name);
  const data = await fetch(`http://localhost:3001/recipes?${[categoryParam, sort, filter].join('&')}`);
  return await data.json();
};

export const deleteRecipe = async id => {
  return await fetch(`http://localhost:3001/recipes/${id}`, { method: 'DELETE'});
};