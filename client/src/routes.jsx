import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Recipes from "./components/Recipes";
import RecipesLoggedIn from "./components/UserRecipes";
import Recipe from "./components/Recipe";
import Add from "./components/Add";
import Edit from "./components/Edit";
import LoginForm from "./components/LoginForm";
import {userLoggedIn} from "./services";

const Routes = () => {
  return (
    <>
      <Router>
        <LoginForm/>
          <Switch>
            <Route path="/recipes/:recipeId/edit">
              <Edit/>
            </Route>
            <Route path="/add">
              <Add/>
            </Route>
            <Route path="/recipes/:recipeId">
              <Recipe/>
            </Route>
            <Route path="/recipes">
              {userLoggedIn() ? <RecipesLoggedIn/> : <Recipes/>}
            </Route>
            <Redirect from="/" to="recipes"/>
          </Switch>
      </Router>
    </>
  )
};

export default Routes;
