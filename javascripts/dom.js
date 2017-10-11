'use strict';
let output = $('#dinosaur-container');

var domString = (dino) => {
  var domString = '';
  domString += `<div>`;
  domString += `<h1>${dino.type}</h1>`;
  domString += `</div>`;
  printToDom(domString);
};

const printToDom = (strang) => {
  output.append(strang);
};

module.exports = { domString };

