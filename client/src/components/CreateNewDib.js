import React, { Component } from 'react';

export default class CreateNewDib extends Component {
  state = {
    title: '',
    error: null,
  };

  createNew = async e => {
    e.preventDefault();

    // TODO: Make API call to create dib.
  };

  render() {
    const { error, title } = this.state;

    return (
      <div>
        {error}
        <textarea
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
