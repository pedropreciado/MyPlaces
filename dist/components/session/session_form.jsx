import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConf: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, value) {
    this.setState({ key: value });
  }

  render() {
    return (
      <form>
        <label>
          <input
            type='text'
            onChange={(event) =>
              this.handleChange('email', event.target.value)
            }
            />

          <input
            type='text'
            onChange={(event) => {
              this.handleChange('username', event.target.value)
            }}
            />
          <input
            type='password'
            onChange={(event) => {
              this.handleChange('password', event.target.value)
            }}
            />
          <input
            type='password'
            onChange={(event) => {
              this.handleChange('password', event.target.value)
            }}
            />
          <input
            type='password'
            onChange={(event) => {
              this.handleChange('passwordConf', event.target.value)
            }}
            />
        </label>
      </form>
    )
  }
}

export default SessionForm;
