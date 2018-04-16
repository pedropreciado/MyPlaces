import React from 'react';
import SearchIndexItem from 'search_index_item';

class SearchIndex extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.searchResults.length === 0) {
      return;
    } else {

      return (
        <div>
        {
          this.props.searchResults.map((place) => {
            return (
              <SearchIndexItem
              place={place}
              />
            )
          })
        }
        </div>
      )
    }
  }
}

export default SearchIndex;
