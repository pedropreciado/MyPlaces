import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';


const SessionReducer = (oldState = { currentUser: null }, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
        return merge({}, oldState, action.user);
      break;
    default:
      return oldState;
  }
}

export default SessionReducer;
