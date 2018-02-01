import React, { Component } from 'react';
import styled from 'react-emotion';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class CreateNewDib extends Component {
  state = {
    title: 'big',
    creator: 'creator',
    error: null,
  };

  createNew = async () => {
    this.setState({ error: null });

    try {
      await this.props.createDib({
        title: this.state.title,
        creator: this.state.creator,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { error, title, creator } = this.state;
    const { id, createdAt, updatedAt, claimed } = this.props;

    return (
      <Container>
        {error}
        <div>Create New Dib</div>
        Title:{' '}
        <input
          value={title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        Creator:{' '}
        <input
          value={creator}
          onChange={e => this.setState({ creator: e.target.value })}
        />
        <Create onClick={this.createNew}>Create New Dib</Create>
      </Container>
    );
  }
}

const Container = styled('div')`
  border: 1px solid black;
  border-radius: 4px;
  margin: 20px 0;
  padding: 20px 10px;
`;

const Create = styled('button')``;

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
