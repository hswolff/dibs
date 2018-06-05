import React, { Component } from 'react';

export default class SignIn extends Component {
  state = {
    input: '',
  };

  logIn = () => {
    this.props.onUsernameChange(this.state.input);
  };

  logOut = () => {
    this.props.onUsernameChange(null);
  };

  render() {
    const { username } = this.props;
    const { input } = this.state;

    if (username) {
      return (
        <div>
          Logged in as: <b>{username}</b>
          <button onClick={this.logOut}>Log Out</button>
        </div>
      );
    }

    return (
      <div>
        <input
          value={input}
          onChange={e => this.setState({ input: e.target.value })}
        />
        <button onClick={this.logIn}>Log In</button>
      </div>
    );
  }
}
