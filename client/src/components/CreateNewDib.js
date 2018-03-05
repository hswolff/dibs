import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import viewer from '../services/viewer';

const Enter = 13;

class CreateNewDib extends Component {
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
      await this.props.createDib({
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

const CREATE_MUTATION = gql`
  mutation CreateQuery($title: String!, $creator: String!) {
    createDib(creator: $creator, title: $title) {
      creator
      id
      title
      createdAt
      updatedAt
    }
  }
`;

export default graphql(CREATE_MUTATION, {
  props: ({ mutate }) => ({
    createDib: ({ title, creator }) =>
      mutate({
        variables: { title, creator },
      }),
  }),
})(CreateNewDib);
