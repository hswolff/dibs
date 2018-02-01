import React, { Component } from 'react';
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
      <Container claimed={isClaimed}>
        {error}
        <div>{creator} is offering</div>
        <h1>{title}</h1>
        <RelativeTime liveUpdate={!isClaimed && isSignedIn} time={createdAt} />
        <ClaimedContainer onClick={this.callDibs} disabled={!canBeClaimed}>
          {isClaimed ? 'Claimed!' : 'Dibs?'}
        </ClaimedContainer>
        {isClaimed && (
          <div>
            Claimed by <b>{claimed.user}</b> at <b>{claimed.time}</b>
          </div>
        )}
      </Container>
    );
  }
}

const Container = styled('div')`
  border: 1px solid ${props => (props.claimed ? 'red' : 'black')};
  border-radius: 4px;
  margin: 20px 0;
  padding: 20px 10px;
`;

const ClaimedContainer = styled('button')``;

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
