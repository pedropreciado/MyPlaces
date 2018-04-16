import { RECEIVE_SEARCH_RESULTS, } from '../actions/place_actions';
import merge from 'lodash/merge';

const SearchReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
      return action.results;
    default:
      return oldState;
  }
}

export default SearchReducer;
