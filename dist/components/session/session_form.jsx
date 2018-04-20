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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key, value) {
    console.log(key, value);
    console.log(this.state);
    this.setState({ [key]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.props.signup(this.state);
  }

  render() {
    return (
      <form>
          <input
            id='name-searchbox'
            type='text'
            onChange={(event) =>
              this.handleChange('email', event.target.value)
            }
            value={this.state.email}
            placeholder='email'
            />

          <input
            id='name-searchbox'
            type='text'
            onChange={(event) => {
              this.handleChange('username', event.target.value)
            }}
            value={this.state.username}
            placeholder='username'
            />
          <input
            id='name-searchbox'
            type='password'
            onChange={(event) => {
              this.handleChange('password', event.target.value)
            }}
            value={this.state.password}
            placeholder='password'
            />
          <input
            id='name-searchbox'
            type='password'
            onChange={(event) => {
              this.handleChange('passwordConf', event.target.value)
            }}
            value={this.state.passwordConf}
            placeholder='retype password'
            />
          <input
            id='name-searchbox'
            type='submit'
            onClick={(event) => this.handleSubmit(event)}
            />
      </form>
    )
  }
}

export default SessionForm;
