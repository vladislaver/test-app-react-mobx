'use strict'

// libs
import React from 'react';
import { render } from 'react-dom';

import MatesList from './components/MatesList'
import MatesStore from './store/MatesStore';

// styles
import '../less/style.less';

MatesStore.load((db) => {
  render (<MatesList db={ db } />, document.getElementById('app'));
})
