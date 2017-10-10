'use strict';

const dom = require('./dom');

const initializer = () => {
  dom.domString({ name: 'T-Rex' });
};

module.exports = { initializer };

