import React, { Component } from 'react';
import PropTypes from 'prop-types';
import timeago from 'timeago.js';

export default class RelativeTime extends Component {
  static propTypes = {
    liveUpdate: PropTypes.bool,
    time: PropTypes.string.isRequired,
  };

  static defaultProps = {
    liveUpdate: false,
  };

  componentDidMount() {
    if (this.props.liveUpdate) {
      this.startUpdating();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.liveUpdate) {
      this.startUpdating();
    } else {
      this.stopUpdating();
    }
  }

  componentWillUnmount() {
    this.stopUpdating();
  }

  startUpdating = () => {
    this.intervalId = setInterval(() => this.forceUpdate(), 2500);
  };

  stopUpdating() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    const { time } = this.props;
    const dateObject = new Date(time);

    return <div title={time}>{timeago().format(dateObject)}</div>;
  }
}
