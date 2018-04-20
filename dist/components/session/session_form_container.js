import SessionForm from './session_form';
import { connect } from 'react-redux';
import {
  login,
  logout,
  signup
} from '../../actions/session_actions';

const mapStateToProps = (state) => {
  let currentUser = state.session.currentUser;

  return {
    currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
    signup: (user) => dispatch(signup(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
