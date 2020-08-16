import React, { useEffect, useReducer } from "react";
import {Switch, Route, BrowserRouter } from "react-router-dom"
import './App.css';
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"
import ListaPostsContext from './contexts/ListaPostsContext';
import { listaReducer, initialState } from "./reducers/ListaPosts";
import { pegaPosts } from "./actions/ApiPosts"

const urlBase = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit'

const App = () => {  
  const [state, dispatch] = useReducer(listaReducer, initialState);

  useEffect(() => {
    pegaPosts(dispatch)
  }, [])

  return (
    <ListaPostsContext.Provider value={{posts: state.posts, dispatch: dispatch }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LoginPage baseUrl={urlBase} />
          </Route>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/registro">
            <RegisterPage baseUrl={urlBase} />
          </Route>
        </Switch>
      </BrowserRouter>
    </ListaPostsContext.Provider>
  );
};

export default App;

