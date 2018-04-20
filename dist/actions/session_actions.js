import * as SessionAPIUtil from '../utils/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'

export const login = (user) => dispatch => {
  SessionAPIUtil.login(credentials)
    .then((user) => {
    dispatch(receiveCurrentUser(user))
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
    .then((user) => {
      dispatch(receiveCurrentUser(user))
    })
    .catch((err) => {
      console.error(err);
    })
}

const receiveCurrentUser = (user) => ({
  type: 'RECEIVE_CURRENT_USER',
  currentUser: user
})
