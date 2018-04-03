import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import api from '../services/api';
import viewer from '../services/viewer';

const Enter = 13;

export default class CreateNewDib extends Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
  };

  state = {
    title: '',
    error: null,
  };

  onKeyDown = e => {
    // Enter on cmd+enter
    if (e.metaKey && e.keyCode === Enter) {
      this.createNew(e);
    }
  };

  createNew = async e => {
    e.preventDefault();

    this.setState({ error: null });

    const viewerUsername = viewer.getUsername();

    try {
      await api.createDib({
        title: this.state.title,
        creator: viewerUsername,
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
      <Fragment>
        {error}
        <Container onSubmit={this.createNew}>
          <Left>
            <Textarea
              autoFocus
              tabIndex={1}
              placeholder="Create New Dib"
              value={title}
              onChange={e => this.setState({ title: e.target.value })}
              onKeyDown={this.onKeyDown}
            />
          </Left>
          <Right>
            <Button onClick={this.createNew}>Create New Dib</Button>
          </Right>
        </Container>
      </Fragment>
    );
  }
}

const Container = styled('form')`
  border-bottom: 4px solid #b1b1b1;
  margin: 20px 0;
  padding: 20px 0 0;
  display: flex;
`;

const Left = styled('div')`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Textarea = styled('textarea')`
  resize: vertical;
  padding: 10px;
  font-size: 26px;
`;

const Right = styled('div')`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Button = styled('button')`
  height: 100%;
`;
