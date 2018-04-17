import React from 'react';
import PlaceIndexItem from './place_index_item';
import SideBar from 'react-sidebar';
import PlaceFormContainer from './place_form_container';
import SearchIndexContainer from '../searches/search_index_container';

class PlaceIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false,
      dragHeard: false
    }

    this.renderTrashCan = this.renderTrashCan.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    this.props.fetchFavorites();
    this.props.subscribeToUpdater();
  }

  onSetSidebarOpen(open) {
    this.setState({
      sidebarOpen: open
    })
  }

  handleDrag() {
    this.setState({ dragHeard: true });
  }

  renderTrashCan() {
    if (this.state.dragHeard) {
      return (
        <div>
          Drag here to delete!
        </div>
      )
    } else {
      return (
        <h2>MyPlaces</h2>
      )
    }
  }

  render() {

    if (!this.props.places.length) {

      return (

        <SideBar
          sidebar={ (
            <div>
            <PlaceFormContainer />
            <SearchIndexContainer />
            </div>
          ) }
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={STYLES}
          >
          <button
            onClick={() => this.onSetSidebarOpen(true)}
            >
            Add a new place!
          </button>
        </SideBar>
      )
    } else {
      return (

          <SideBar
            sidebar={ (
              <div>
              <PlaceFormContainer />
              <SearchIndexContainer
                onSetSidebarOpen={this.onSetSidebarOpen}
                />
              </div>
            ) }
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={STYLES}
            >


        <div className='place-index'>
          {
            this.props.places.map((place) => {

              return (
                <PlaceIndexItem
                  key={place._id}
                  place={place}
                  deleteFavorite={this.props.deleteFavorite}
                  />
              )
            })
          }

        </div>

        {
            this.renderTrashCan()
        }

        <button
          onClick={() => this.onSetSidebarOpen(true)}
          >
          >
        </button>

      </SideBar>
      )
    }
    }

}

export default PlaceIndex;

const STYLES = {
  sidebar: {
    width: 500,
    backgroundColor: '#202a2f',
    opacity: 5
  }
}
