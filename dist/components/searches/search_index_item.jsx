import React from 'react';

class SearchIndexItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    let place = this.props.place;

    return (
      <div>
        {
          place.name
        }
      </div>
    )
  }
}

export default SearchIndexItem;
