import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styled from 'react-emotion';

import CreateNewDib from './CreateNewDib';
import DibCell from './DibCell';

class HomePage extends Component {
  render() {
    const { dibs, loading } = this.props;

    if (loading) {
      return null;
    }

    return (
      <Container>
        <h1 css={{ color: 'red', fontSize: '33px' }}>Got Dibs?</h1>
        <CreateNewDib />
        {dibs.map(dib => <DibCell key={dib.id} {...dib} />)}
      </Container>
    );
  }
}

const Container = styled('main')`
  width: 600px;
  margin: 0 auto;
`;

const DIBS_QUERY = gql`
  query AllDibs {
    dibs {
      creator
      id
      title
      createdAt
      updatedAt
      claimed {
        user
        time
      }
    }
  }
`;

export default graphql(DIBS_QUERY, {
  props: ({ data: { dibs, loading } }) => ({
    dibs,
    loading,
  }),
})(HomePage);
