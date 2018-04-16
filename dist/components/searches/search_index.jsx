import React from 'react';
import SearchIndexItem from './search_index_item';

class SearchIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);

      return (
        <div>
        {
          this.props.searchResults.map((place) => {
            return (
              <SearchIndexItem
              key={place._id}
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
