import PlaceForm from './place_form';
import { connect } from 'react-redux';
import { fetchSearchResults } from '../../actions/place_actions';
import { fetchLocation, setZipcode } from '../../actions/location_actions';

const mapStateToProps = (state) => {
  let location =  state.location.currentLocation;
  let locationError = state.location.error ? true : false;
  return {
    location,
    locationError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchResults: (query) => dispatch(fetchSearchResults(query)),
    fetchLocation: () => dispatch(fetchLocation()),
    setZipcode: (zipcode) => dispatch(setZipcode(zipcode))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceForm);
