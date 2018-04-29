import React from 'react';
import PlaceIndexItem from './place_index_item';
import SideBar from 'react-sidebar';
import PlaceFormContainer from './place_form_container';
import SearchIndexContainer from '../searches/search_index_container';
import SessionFormContainer from '../session/session_form_container';
import TimeFormatter from '../../utils/time_formatter';

class PlaceIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false,
      dragHeard: false,
      text: `Hello, ${props.currentUser.username}`
    }

    this.renderHeader = this.renderHeader.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  componentWillMount() {

    if (this.props.currentUser.id) {
      this.props.subscribeToUpdater(this.props.currentUser.id);
      this.props.fetchFavorites(this.props.currentUser.id);
    }
  }

  componentDidMount() {

    let texts = [
      'yooshe',
      this.props.places.length
      ? 'click a yooshe to refresh'
      : 'open sidebar to add new place',
      `Hello, ${this.props.currentUser.username}.`
    ]


    let i = 0;

    setInterval(() => {
      var dateObj = new Date();

      if (i === 3) {
        let d = new Date();
        this.setState({ text: `${TimeFormatter(d)}` })
      } else {
        this.setState({ text: texts[++i % texts.length] });
      }
    }, 5000)
  }

  onSetSidebarOpen(open) {
    this.setState({
      sidebarOpen: open
    })
  }

  handleDrag(dragHeard) {
    this.setState({ dragHeard });
  }

  renderHeader() {
      return (
          <div className='trash-text'>
            { this.state.text }
          </div>
      )
  }

  render() {
    if (typeof this.places === 'object') {
      return (
        <a>Loading ...</a>
      )
    }
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
                this.renderHeader()
              }
              <div
                onClick={this.props.logout}
                id='logout'>
                logout
              </div>
            </div>

      <div className='place-index'>
        {
          this.props.places.map((place) => {

            return (
              <PlaceIndexItem
                key={place._id} place={place}
                deleteFavorite={this.props.deleteFavorite}
                handleDrag={this.handleDrag} handleStop={this.handleStop}
                refresh={this.props.refresh}
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
    width: '40%',
    backgroundColor: '#fafafa',
    color: 'white',
    opacity: 5
  }
}
