import React from 'react';
import PlaceIndexItem from './place_index_item';
import SideBar from 'react-sidebar';
import PlaceFormContainer from './place_form_container';
import SearchIndexContainer from '../searches/search_index_container';


const FontAwesome = require('react-fontawesome');
// i/mport PlaceFormContainer from './place_form_container';

class PlaceIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false
    }

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

  render() {
    if (!this.props.places.length) {
      return (
          <FontAwesome
            className="fas fa-spinner fa-spin"
            name='spinner'
            />
      )
    } else {
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


        <div className='place-index'>
          {
            this.props.places.map((place) => {

              return (
                <PlaceIndexItem
                  key={place._id}
                  place={place}
                  />
              )
            })
          }

        </div>

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
