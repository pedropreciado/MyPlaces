import React from 'react';
import SearchIndexItem from './search_index_item';

class SearchIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);

      return (
        <div id='search-index'>
        {
          this.props.searchResults.map((place) => {
            return (
              <SearchIndexItem
              key={place.placeid}
              place={place}
              addFavorite={this.props.addFavorite}
              />
            )
          })
        }
        </div>
      )
  }
}

export default SearchIndex;
