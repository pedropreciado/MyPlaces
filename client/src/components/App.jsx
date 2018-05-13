import React from 'react';
import { Provider } from 'react-redux';
import PlaceIndexContainer from './places/place_index_container';
import SessionFormContainer from './session/session_form_container';
import {
  HashRouter,
  Route,
  Redirect,
  Link,
  Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../utils/route_util";

const App = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path='/' component={SessionFormContainer} />
        <AuthRoute path='/auth' component={SessionFormContainer} />
        <ProtectedRoute path='/places' component={PlaceIndexContainer}/>
      </Switch>
    </ HashRouter>
  </Provider>
)


export default App;
