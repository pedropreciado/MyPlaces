import * as SessionAPIUtil from '../utils/session_api_util';
import { fetchFavorites } from './place_actions';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const login = (user) => dispatch => {
  SessionAPIUtil.login(user)
    .then(({ data }) => {
      console.log(data);
      if (data.status > 400) {
        dispatch(receiveErrors(data))
      } else {
        dispatch(receiveCurrentUser(data))
      }
  })
    .catch((err) => {
      console.error(err)
    })
}

export const logout = () => dispatch => {
  SessionAPIUtil.logout()
    .then(dispatch(receiveCurrentUser(null)))
    .catch((err) => {
      console.error(err);
    })
}

export const signup = (user) => dispatch => {
  SessionAPIUtil.signup(user)
    .then(({ data }) => {
      if (data.status === 400) {
        dispatch(receiveErrors(data.status))
      } else {
        dispatch(receiveCurrentUser(data))
      }
    })
    .catch((err) => {
      console.error(err);
    })
}

const receiveCurrentUser = (user) => ({
  type: 'RECEIVE_CURRENT_USER',
  currentUser: user
})

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
})
