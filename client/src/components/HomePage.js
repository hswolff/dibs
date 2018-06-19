import React, { Component } from 'react';
import CreateNewDib from './CreateNewDib';
import SignIn from './SignIn';

// TODO: Subscribe to Change Stream and update when dib changes.

export default class HomePage extends Component {
  state = {
    username: localStorage.getItem('username') || 'Default User',
  };

  componentDidMount = () => {
    this.loadDibs();
  };

  loadDibs = async () => {
    // TODO: Load all data and save it in state.
  };

  onUsernameChange = username => {
    localStorage.setItem('username', username);
    this.setState({ username });
  };

  render() {
    const { username } = this.state;

    return (
      <div>
        <header>
          <h1>Got Dibs?</h1>
        </header>
        <SignIn username={username} onUsernameChange={this.onUsernameChange} />
        <br />
        <CreateNewDib onSuccess={this.loadDibs} username={username} />
        <div>{/* TODO: Render all dibs. */}</div>
      </div>
    );
  }
}
