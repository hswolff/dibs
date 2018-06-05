import React, { Component } from 'react';
import './DibCell.css';

export default class DibCell extends Component {
  render() {
    const { title, creator } = this.props;

    return (
      <div className="dib-container">
        <div className="dib-left">
          <div className="dib-creator">
            <b>{creator}</b> is offering
          </div>
          <div className="dib-title">{title}</div>
        </div>
        <div className="dib-right" />
      </div>
    );
  }
}
