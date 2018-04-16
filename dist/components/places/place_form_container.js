import PlaceForm from './place_form';
import { connect } from 'react-redux';
import { fetchSearchResults } from '../../actions/place_actions';

const mapStateToProps = (state) => {
  let searchResults;

  if (!state.searchResults) {
    searchResults = [];
  } else {
    searchResults = state.searchResults.map((id) => {
      return state.results[id];
    })
  }

  let location = state.location.currentLocation;

  return {
    searchResults,
    location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchResults: (name, location) => dispatch(fetchSearchResults(name, location))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceForm);
