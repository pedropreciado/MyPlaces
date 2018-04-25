import React from "react";
import { withRouter, Route, Redirect } from "react-router";
import { connect } from "react-redux";

const Auth = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => (
      ! loggedIn ? (
        <Component {...props} />
      ) : (
      <Redirect to="/places" />
      )
    )} />
)

const Protected = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => (
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/auth" />
      )
    )} />
)

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser)
  };
};

export const AuthRoute = withRouter(connect(
  mapStateToProps,
  null)(Auth));

export const ProtectedRoute = withRouter(connect(
  mapStateToProps,
  null
)(Protected))
