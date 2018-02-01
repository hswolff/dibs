import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import viewer from '../services/viewer';

export default class SignIn extends Component {
  state = {
    username: '',
    error: false,
  };

  onSubmit = () => {
    if (viewer.isSignedIn()) {
      this.signOut();
    } else {
      this.signOut();
    }
  };

  signIn = e => {
    e.preventDefault();

    if (this.state.username === '') {
      this.setState({ error: true });
      return;
    }

    viewer.signIn(this.state.username);
    this.setState({ error: false, username: '' });

    this.props.onChange();
  };

  signOut = e => {
    e.preventDefault();
    viewer.signOut();
    this.props.onChange();
  };

  render() {
    const { username, error } = this.state;
    const viewerUsername = viewer.getUsername();
    const isSignedIn = viewer.isSignedIn();

    return (
      <Form onSubmit={this.onSubmit} error={error}>
        {isSignedIn ? (
          <Fragment>
            <Viewer>{viewerUsername}</Viewer>
            <Button tabIndex={0} onClick={this.signOut}>
              Sign Out
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Input
              tabIndex={0}
              placeholder="Create a username"
              onChange={e =>
                this.setState({ username: e.target.value, error: false })
              }
              value={username}
            />
            <Button onClick={this.signIn}>Sign In</Button>
          </Fragment>
        )}
      </Form>
    );
  }
}

const Form = styled('form')`
  box-shadow: 0 1px 2px ${props => (props.error ? 'red' : '#525252')};
  border-radius: 4px;
  padding: 5px;
`;

const Input = styled('input')`
  border: 0;
`;

const Button = styled('button')`
  border-radius: 4px;
`;

const Viewer = styled('span')`
  display: inline-block;
  margin: 0 10px 0 5px;
`;
