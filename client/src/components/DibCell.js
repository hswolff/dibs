import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import RelativeTime from './RelativeTime';

class DibCell extends Component {
  state = {
    error: null,
  };

  callDibs = async () => {
    this.setState({ error: null });

    try {
      await this.props.callDibs({
        id: this.props.id,
        user: this.props.viewer,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { error } = this.state;
    const {
      viewer,
      canBeClaimed,
      title,
      creator,
      createdAt,
      claimed,
    } = this.props;

    const isSignedIn = viewer != null;

    const isClaimed = claimed.user != null;

    return (
      <Fragment>
        {error}
        <Container claimed={isClaimed}>
          <Left claimed={isClaimed}>
            <Creator>
              <b>{creator}</b> is offering
            </Creator>
            <Title>{title}</Title>
            <RelativeTime
              liveUpdate={!isClaimed && isSignedIn}
              time={createdAt}
            />
          </Left>
          <Right>
            <ClaimedButton
              onClick={this.callDibs}
              claimed={isClaimed}
              disabled={!canBeClaimed || isClaimed}
            >
              {isClaimed ? 'Claimed!' : 'Dibs?'}
            </ClaimedButton>
            {isClaimed && (
              <div>
                <div>
                  Claimed by <b>{claimed.user}</b>
                </div>
                <div>
                  <RelativeTime time={claimed.time} />
                </div>
              </div>
            )}
          </Right>
        </Container>
      </Fragment>
    );
  }
}

const Container = styled('div')`
  margin: 20px 0;
  padding: 20px 0;
  display: flex;
  opacity: ${props => (props.claimed ? '0.4' : '1.0')};
`;

const Left = styled('div')`
  width: 70%;
  border-right: 9px solid ${props => (props.claimed ? '#b1b1b1' : '#54a73f')};
  padding-right: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Creator = styled('div')`
  font-size: 0.9rem;
`;

const Title = styled('h1')`
  margin: 0;
`;

const Right = styled('div')`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ClaimedButton = styled('button')`
  cursor: ${props => (props.claimed ? 'not-allowed' : 'pointer')};
  height: ${props => (props.claimed ? 'auto' : '100%')};
  width: 100%;
  font-size: ${props => (props.claimed ? 'inherit' : '50px')};
`;

const CLAIM_MUTATION = gql`
  mutation ClaimDib($id: ID!, $user: String!) {
    claimDib(id: $id, user: $user) {
      id
      creator
      title
      claimed {
        user
        time
      }
    }
  }
`;

export default graphql(CLAIM_MUTATION, {
  props: ({ mutate }) => ({
    callDibs: ({ id, user }) =>
      mutate({
        variables: { id, user },
      }),
  }),
})(DibCell);
