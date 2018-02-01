import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styled from 'react-emotion';

import viewer from '../services/viewer';

import SignIn from './SignIn';
import CreateNewDib from './CreateNewDib';
import DibCell from './DibCell';

class HomePage extends Component {
  signOut = () => {
    viewer.signOut();
    this.forceUpdate();
  };

  render() {
    const { dibs, loading } = this.props;

    if (loading) {
      return null;
    }

    const isSignedIn = viewer.isSignedIn();
    const viewerUsername = viewer.getUsername();

    return (
      <Container>
        <h1 css={{ color: 'red', fontSize: '33px' }}>Got Dibs?</h1>

        {isSignedIn ? (
          <Fragment>
            <div>
              Viewer: <b>{viewerUsername}</b>
              <button onClick={this.signOut}>Sign Out</button>
            </div>
            <CreateNewDib />
          </Fragment>
        ) : (
          <Fragment>
            <SignIn onSuccess={() => this.forceUpdate()} />
          </Fragment>
        )}
        {dibs.map(dib => (
          <DibCell
            key={dib.id}
            canBeClaimed={isSignedIn}
            viewer={viewerUsername}
            {...dib}
          />
        ))}
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
