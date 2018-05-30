import React, { Component } from 'react';
import api from '../services/api';
import DibCell from './DibCell';

export default class HomePage extends Component {
  state = {
    dibs: [],
  };

  componentDidMount = async () => {
    const result = await api.getDibs();
    this.setState({ dibs: result.data });
  };

  render() {
    const { dibs } = this.state;

    return (
      <div>
        <header>
          <h1>Got Dibs?</h1>
        </header>
        <div>{dibs.map(dib => <DibCell key={dib._id} {...dib} />)}</div>
      </div>
    );
  }
}
