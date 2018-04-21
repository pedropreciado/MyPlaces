import React from 'react';
import SideBar from 'react-sidebar';

class SearchIndexItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      color: ''
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ color: '-green' })
    this.props.addFavorite({
      placeid: this.props.place.place_id,
      userID: this.props.currentUser.id
    });
    this.props.onSetSidebarOpen(false);
  }

  onSetSidebarOpen(open) {
    this.setState({
      sidebarOpen: open
    })
  }

  render() {
    let place = this.props.place;

    return (
      <div
        id={`search-index-item${this.state.color}`}
        onClick={this.handleClick}
        >
        <a>{
          place.name + ' on '
        }</a>
      <a>
        {
          place.vicinity
        }
      </a>
      </div>
    )
  }
}

export default SearchIndexItem;
