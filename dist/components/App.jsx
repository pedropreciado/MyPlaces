import React from 'react';
import getPlaceData from '../utils/google_api_util';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    console.log('req sent');

    getPlaceData("Philz coffee")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("ERROR");
        console.log(err);
      })

  }

  render() {
    return (
      <h1>
        <button
          onClick={this.handleClick}
          >
          press
        </button>
      </h1>
    )
  }
}

export default App;
