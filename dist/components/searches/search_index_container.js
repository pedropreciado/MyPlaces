import SearchIndex from './search_index';
import { connect } from 'redux';
import { addFavorite } from '../../actions/place_actions';

const mapStateToProps = (state) => {
  let searchResults = Object.keys(state.searchResults);

  if (searchResults.length === 0) {
    searchResults = [];
  } else {
    searchResults = searchResults.map((id) => {
      return state.searchResults[id];
    })
  }

  return {
    searchResults
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (id) => dispatch(addFavorite(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchIndex);
