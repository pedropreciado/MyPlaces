import React from 'react';
import SearchIndexItem from './search_index_item';

class SearchIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div id='search-index'>
        {
          this.props.searchResults.map((place) => {
            return (
              <SearchIndexItem
              key={place.placeid}
              place={place}
              addFavorite={this.props.addFavorite}
              onSetSidebarOpen={this.props.onSetSidebarOpen}
              currentUser={this.props.currentUser}
              />
            )
          })
        }
        </div>
      )
  }
}

export default SearchIndex;
