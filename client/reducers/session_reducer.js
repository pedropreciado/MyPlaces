import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from '../actions/session_actions';
import merge from 'lodash/merge';


const SessionReducer = (oldState = { currentUser: null }, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
        return merge({}, oldState, { currentUser: action.currentUser });
      break;
    case RECEIVE_ERRORS:
      return merge({}, oldState, { ['errors']: action.errors})
    default:
      return oldState;
  }
}

export default SessionReducer;
