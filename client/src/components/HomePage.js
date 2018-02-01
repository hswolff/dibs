import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styled from 'react-emotion';

import viewer from '../services/viewer';

import SignIn from './SignIn';
import CreateNewDib from './CreateNewDib';
import DibCell from './DibCell';

class HomePage extends Component {
  state = {
    showCreateNew: false,
  };

  onViewerStateChange = () => {
    this.setState({ showCreateNew: false });
  };

  render() {
    const { showCreateNew } = this.state;
    const { dibs, loading } = this.props;

    if (loading) {
      return null;
    }

    const isSignedIn = viewer.isSignedIn();
    const viewerUsername = viewer.getUsername();

    return (
      <Container>
        <Header>
          <Title>Got Dibs?</Title>
          <HeaderRight>
            {isSignedIn && (
              <ShowCreateNew
                title="Create new Dib"
                onClick={() =>
                  this.setState(state => ({
                    showCreateNew: !state.showCreateNew,
                  }))
                }
              >
                +
              </ShowCreateNew>
            )}
            <SignIn onChange={this.onViewerStateChange} />
          </HeaderRight>
        </Header>
        {isSignedIn &&
          showCreateNew && (
            <CreateNewDib
              onSuccess={() => {
                this.setState({ showCreateNew: false });
              }}
            />
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
  margin: 20px auto;
`;

const Header = styled('header')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled('h1')`
  font-size: 42px;
  font-weight: 800;
`;

const HeaderRight = styled('div')`
  display: flex;
  align-items: baseline;
`;

const ShowCreateNew = styled('div')`
  cursor: pointer;
  padding: 5px 15px;
  background: #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 1px #525252;
  margin: 0 10px;
  font-weight: 800;
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
