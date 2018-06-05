import React, { Component } from 'react';
import api from '../services/api';
import './DibCell.css';

export default class DibCell extends Component {
  claimDib = async () => {
    this.setState({ error: null });

    try {
      await api.claimDib({
        id: this.props._id,
        user: this.props.username,
      });
    } catch (error) {
      console.error('Error claiming dib', error);
    }
  };

  render() {
    const { title, creator, claimed } = this.props;

    const isClaimed = claimed && claimed.user != null;

    return (
      <div className="dib-container">
        <div className="dib-left">
          <div className="dib-creator">
            <b>{creator}</b> is offering
          </div>
          <div className="dib-title">{title}</div>
        </div>
        <div className="dib-right">
          <button className="dib-claim-button" onClick={this.claimDib}>
            {isClaimed ? 'Claimed!' : 'Dibs?'}
          </button>
        </div>
      </div>
    );
  }
}
