import PlaceIndex from "./place_index";
import { connect } from 'react-redux';
import { fetchFavorites } from "../../actions/place_actions";

const mapStateToProps = (state) => {
  return {
    places: state.places
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFavorites: () => dispatch(fetchFavorites())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceIndex);
