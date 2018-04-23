import React from 'react';
import PlaceIndexItem from './place_index_item';
import SideBar from 'react-sidebar';
import PlaceFormContainer from './place_form_container';
import SearchIndexContainer from '../searches/search_index_container';
import SessionFormContainer from '../session/session_form_container';

class PlaceIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false,
      dragHeard: false
    }

    this.renderTrashCan = this.renderTrashCan.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  componentWillMount() {

    if (this.props.currentUser.id) {
      console.log(this.props.currentUser.id);
      this.props.subscribeToUpdater(this.props.currentUser.id);
      this.props.fetchFavorites(this.props.currentUser.id);
    }
  }

  onSetSidebarOpen(open) {
    this.setState({
      sidebarOpen: open
    })
  }

  handleStop(positionY, id) {
    if (event.pageY > 500) {
      this.props.deleteFavorite(id);
    }
  }

  handleDrag(dragHeard) {
    this.setState({ dragHeard });
  }

  renderTrashCan() {
    if (this.state.dragHeard) {
      return (
        <div className='trash-text'>
          Drag here to delete!
        </div>
      )
    } else {
      return (
        <div className='trash-text'>
          Hello, { this.props.currentUser.username }.
        </div>
      )
    }
  }

  render() {

    return (
          <SideBar
            sidebar={ (
              <div>
                <PlaceFormContainer />
                <SearchIndexContainer
                  currentUser={this.props.currentUser}
                  onSetSidebarOpen={this.onSetSidebarOpen}
                  />
              </div>
            ) }
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={STYLES}
            >

            <div
              ref='trashcan'
              id='trashcan'>
              {
                this.renderTrashCan()
              }
            </div>

      <div className='place-index'>
        {
          this.props.places.map((place) => {

            return (
              <PlaceIndexItem
                key={place._id}
                place={place}
                deleteFavorite={this.props.deleteFavorite}
                handleDrag={this.handleDrag}
                handleStop={this.handleStop}
                />
            )
          })
        }
      </div>
      <div
        id='sidebar-open-button'
        onClick={() => this.onSetSidebarOpen(true)}
        >
                >
      </div>

    </SideBar>
    )
  }
}

export default PlaceIndex;

const STYLES = {
  sidebar: {
    width: 500,
    backgroundColor: '#5c665e',
    opacity: 5
  }
}
