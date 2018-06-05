import React, { Component } from 'react';
import api from '../services/api';

export default class CreateNewDib extends Component {
  state = {
    title: '',
    error: null,
  };

  createNew = async e => {
    e.preventDefault();

    this.setState({ error: null });

    try {
      await api.createDib({
        title: this.state.title,
        creator: this.props.username,
      });

      this.setState({ title: '' });

      this.props.onSuccess();
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { error, title } = this.state;

    return (
      <div>
        {error}
        <textarea
          autoFocus
          tabIndex={1}
          placeholder="Create New Dib"
          value={title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <br />
        <button onClick={this.createNew}>Create New Dib</button>
      </div>
    );
  }
}
