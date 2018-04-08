import PlaceIndex from "./place_index";
import { connect } from 'react-redux';
import { fetchPlaceData } from "../../actions/place_actions";

const mapStateToProps = (state) => {
  return {
    place: state.place
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlace: (name) => dispatch(fetchPlaceData(name))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceIndex);
