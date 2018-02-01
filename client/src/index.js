import './index.css';

import React from 'react';
import { render } from 'react-dom';

import Typography from 'typography';
import theme from 'typography-theme-moraga';
const typography = new Typography(theme);
typography.injectStyles();

import { ApolloProvider } from 'react-apollo';
import createApolloClient from './createApolloClient';

import HomePage from './components/HomePage';

render(
  <ApolloProvider client={createApolloClient()}>
    <HomePage />
  </ApolloProvider>,
  document.querySelector('#app')
);
