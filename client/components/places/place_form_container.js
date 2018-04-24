import PlaceForm from './place_form';
import { connect } from 'react-redux';
import { fetchSearchResults } from '../../actions/place_actions';
import { fetchLocation } from '../../actions/location_actions';

const mapStateToProps = (state) => {
  let location = state.location.currentLocation;
  
  return {
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
