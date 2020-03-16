import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipe";
import Add from "./components/Add";
import Edit from "./components/Edit";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/recipes/:recipeId/edit">
          <Edit/>
        </Route>
        <Route path="/recipes/:recipeId">
          <Recipe/>
        </Route>
        <Route path="/recipes">
          <Recipes/>
        </Route>
        <Route path="/add">
          <Add/>
        </Route>
        <Redirect from="/" to="recipes" />
      </Switch>
    </Router>
  )
};

export default Routes;