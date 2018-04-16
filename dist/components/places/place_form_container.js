import PlaceForm from './place_form';
import { connect } from 'react-redux';
import { fetchSearchResults } from '../../actions/place_actions';
import { fetchLocation } from '../../actions/location_actions';

const mapStateToProps = (state) => {
  let searchResults = Object.keys(state.searchResults);

  if (searchResults.length === 0) {
    searchResults = [];
  } else {
    searchResults = searchResults.map((id) => {
      return state.searchResults[id];
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
    fetchSearchResults: (query) => dispatch(fetchSearchResults(query)),
    fetchLocation: () => dispatch(fetchLocation())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceForm);
