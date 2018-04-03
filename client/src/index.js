import './index.css';

import React from 'react';
import { render } from 'react-dom';

import Typography from 'typography';
import theme from 'typography-theme-moraga';
const typography = new Typography(theme);
typography.injectStyles();

import HomePage from './components/HomePage';

render(<HomePage />, document.querySelector('#app'));
