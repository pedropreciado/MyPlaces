import PlaceForm from './place_form';
import { connect } from 'recat-redux';
import { fetchSearchResults } from '../../actions/place_actions';

const mapStateToProps = (state) => {
  let searchResults = state.searchResults.map((id) => {
    return state.results[id];
  })

  return {
    searchResults
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
