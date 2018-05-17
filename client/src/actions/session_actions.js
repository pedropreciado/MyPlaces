import * as SessionAPIUtil from '../utils/session_api_util';
import { fetchFavorites } from './place_actions';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const fetchLocalUser = () => dispatch => {
  let user = window.localStorage.getItem('user');  
  if (user) {
    dispatch(receiveCurrentUser(JSON.parse(user)));
  } else {
    dispatch(receiveCurrentUser(null));
  }
};

export const login = (user) => dispatch => {
  SessionAPIUtil.login(user)
    .then(({ data }) => {
      if (data.errmsg) {
        dispatch(receiveErrors(data.errmsg));
      } else {
        dispatch(receiveCurrentUser(data));

        window.localStorage.setItem('user', JSON.stringify(data));
      }
  })
    .catch((err) => {
      dispatch(receiveErrors(err));
    });
};

export const logout = () => dispatch => {
  SessionAPIUtil.logout()
    .then(() => {
      window.localStorage.clear();

      dispatch(receiveCurrentUser(null));
    })
    .catch((err) => {
      dispatch(receiveErrors(err));
    });
};

export const signup = (user) => dispatch => {
  SessionAPIUtil.signup(user)
    .then(({ data }) => {
      if (data.errmsg) {
        dispatch(receiveErrors(data.errmsg));
      } else {
        dispatch(receiveCurrentUser(data));
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const receiveCurrentUser = (user) => ({
  type: 'RECEIVE_CURRENT_USER',
  currentUser: user
});

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});
