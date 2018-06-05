import React, { Component } from 'react';
import api from '../services/api';
import DibCell from './DibCell';
import CreateNewDib from './CreateNewDib';
import SignIn from './SignIn';

export default class HomePage extends Component {
  state = {
    dibs: [],
    username: localStorage.getItem('username'),
  };

  componentDidMount = () => {
    this.loadDibs();

    api.subscribeToDibChanges(event => {
      const { dib, type } = event;
      const currentDibs = this.state.dibs;

      if (type === 'update') {
        return this.setState({
          dibs: [
            ...currentDibs.map(prevDib => {
              if (prevDib._id === dib._id) {
                return dib;
              }
              return prevDib;
            }),
          ],
        });
      }

      // If adding a new dib
      return this.setState({
        dibs: [dib, ...currentDibs],
      });
    });
  };

  loadDibs = async () => {
    const result = await api.getDibs();
    this.setState({ dibs: result.data });
  };

  onUsernameChange = username => {
    localStorage.setItem('username', username);
    this.setState({ username });
  };

  render() {
    const { dibs, username } = this.state;

    return (
      <div>
        <header>
          <h1>Got Dibs?</h1>
        </header>
        <SignIn username={username} onUsernameChange={this.onUsernameChange} />
        <br />
        <CreateNewDib onSuccess={this.loadDibs} username={username} />
        <div>
          {dibs.map(dib => (
            <DibCell key={dib._id} {...dib} username={username} />
          ))}
        </div>
      </div>
    );
  }
}
