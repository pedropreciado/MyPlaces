import React from 'react';

class SearchIndexItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addFavorite(this.props.place.place_id);
  }

  render() {
    let place = this.props.place;

    return (
      <div id='search-index-item'>
        {
          place.name + ' @ ' + place.vicinity
        }
        <button
          onClick={this.handleClick}
          >
          +
        </button>
      </div>
    )
  }
}

export default SearchIndexItem;
