import React, { Component } from 'react';
import viewer from '../services/viewer';

export default class SignIn extends Component {
  state = {
    username: '',
  };

  signIn = () => {
    viewer.signIn(this.state.username);
    this.props.onSuccess();
  };

  render() {
    const { username } = this.state;
    return (
      <form onSubmit={this.signIn}>
        Create a username!
        <input
          onChange={e => this.setState({ username: e.target.value })}
          value={username}
        />
        <button onClick={this.signIn}>Sign In</button>
      </form>
    );
  }
}
