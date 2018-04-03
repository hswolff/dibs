import React, { Component } from 'react';
import styled from 'react-emotion';

import api from '../services/api';
import viewer from '../services/viewer';

import SignIn from './SignIn';
import CreateNewDib from './CreateNewDib';
import DibCell from './DibCell';

export default class HomePage extends Component {
  state = {
    showCreateNew: false,
    dibs: [],
  };

  componentDidMount = async () => {
    const result = await api.getDibs();
    this.setState({ dibs: result.data });

    api.subscribeToDibChanges(event => {
      const { dib, type } = event;
      const currentDibs = this.state.dibs;

      if (type === 'update') {
        return this.setState({
          dibs: [
            ...currentDibs.map(prevDib => {
              if (prevDib._id === dib._id) {
                return dib;
              }
              return prevDib;
            }),
          ],
        });
      }

      return this.setState({
        dibs: [dib, ...currentDibs],
      });
    });
  };

  onViewerStateChange = () => {
    this.setState({ showCreateNew: false });
  };

  render() {
    const { showCreateNew, dibs } = this.state;

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
            key={dib._id}
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
