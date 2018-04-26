import PlaceIndex from "./place_index";
import { connect } from 'react-redux';
import {
  fetchFavorites,
  deleteFavorite,
  subscribeToUpdater,
  refresh
} from "../../actions/place_actions";
import { fetchLocation } from '../../actions/location_actions';
import { logout } from '../../actions/session_actions';

const mapStateToProps = (state) => {

  let places = Object.keys(state.places).map((id) => {
    return state.places[id]
  })

  let currentUser = state.session.currentUser;

  return {
    places,
    currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFavorites: (id) => dispatch(fetchFavorites(id)),
    subscribeToUpdater: (id) => dispatch(subscribeToUpdater(id)),
    fetchLocation: () => dispatch(fetchLocation()),
    deleteFavorite: (id) => dispatch(deleteFavorite(id)),
    logout: () => dispatch(logout()),
    refresh: (id) => dispatch(refresh(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceIndex);
