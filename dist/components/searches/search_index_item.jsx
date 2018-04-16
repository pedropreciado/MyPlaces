import React from 'react';
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
    this.props.addFavorite(this.props.place.place_id);
    this.props.onSetSidebarOpen(false);
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
