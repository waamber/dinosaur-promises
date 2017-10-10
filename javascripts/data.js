'use strict';
const dom = require('./dom');
let dinosaurs = [];

const initializer = () => {
  dom.domString({ name: 'T-Rex' });
};

const getDinosaurs = () => {
  return dinosaurs;
};

module.exports = { initializer, getDinosaurs };

