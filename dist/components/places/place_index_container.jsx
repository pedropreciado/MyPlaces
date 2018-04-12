import PlaceIndex from "./place_index";
import { connect } from 'react-redux';
import { fetchPlaceData } from "../../actions/place_actions";

const mapStateToProps = (state) => {
  return {
    places: state.favorites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFavorites: () => console.log('butt')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceIndex);
