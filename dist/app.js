(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
const dom = require('./dom');
let dinosaurs = [];

const initializer = () => {
  dinoGetter();
};

const firstDinosaurJSON = () => {
  return new Promise((resolve, reject) => {
    $.ajax('./data/dinosaurs.json').done((data) => {
      resolve(data.dinosaurs1);
    }).fail((error) => {
      reject(error);
    });
  });
};

const secondDinosaurJSON = () => {
  return new Promise((resolve, reject) => {
    $.ajax('./data/dinosaurs2.json').done((data) => {
      resolve(data.dinosaurs2);
    }).fail((error) => {
      reject(error);
    });
  });
};

const thirdDinosaurJSON = () => {
  return new Promise((resolve, reject) => {
    $.ajax('./data/dinosaurs3.json').done((data) => {
      resolve(data.dinosaurs3);
    }).fail((error) => {
      reject(error);
    });
  });
};

const allTheCats = () => {
  return new Promise((resolve, reject) => {
    $.ajax('./data/snacks.json').done((data) => {
      resolve(data.cats);
    }).fail((error) => {
      reject(error);
    });
  });
};


//ONLY WORKS IN THIS PROJECT
const dinoGetter = () => {
  Promise.all([firstDinosaurJSON(), secondDinosaurJSON(), thirdDinosaurJSON()])
    .then((results) => {
      allTheCats().then((cats) => {
        results.forEach((result) => {
          result.forEach((dino) => {
            dino.snacks = [];
            dino.catIds.forEach((catId) => { //loops through each cat id
              cats.forEach((cat) => {
                if (cat.id === catId) {
                  dino.snacks.push(cat);
                }
              });
            });
            dinosaurs.push(dino);
          });
        });
        makeDinos();
      }); console.log('dinos with snacks', dinosaurs);
    }).catch((error) => {
      console.log(error);
    });
};

const makeDinos = () => {
  dinosaurs.forEach((dino) => {
    dom.domString(dino);
  });
};

const getDinosaurs = () => {
  return dinosaurs;
};

module.exports = { initializer, getDinosaurs };

// //CORRECT PROMISES!
// const dinoGetter = () => {
//   firstDinosaurJSON().then((results) => {//.then()-happens when resolved // .catch()-happens when it rejects
//     results.forEach((dino) => {
//       dinosaurs.push(dino);
//     });
//     return secondDinosaurJSON();
//   }).then((results2) => {
//     results2.forEach((dino) => {
//       dinosaurs.push(dino);
//     });
//     return thirdDinosaurJSON();
//   }).then((results3) => {
//     results3.forEach((dino) => {
//       dinosaurs.push(dino);
//     });
//     makeDinos();  // console.log(dinosaurs);
//   });
// };

//OLD WAY OF MULTIPLE JSON GETTER
// const dinoGetter = () => {
//   $.ajax('./data/dinosaurs.json').done((data1) => {
//     data1.dinosaurs1.forEach((dino) => { //loops through dinoData and puts each dino object in array into dinosaurs array at the top
//       dinosaurs.push(dino);
//     });
//   });
//   $.ajax('./data/dinosaurs2.json').done((data2) => {
//     data2.dinosaurs2.forEach((dino) => {
//       dinosaurs.push(dino);
//     });
//   });
//   $.ajax('./data/dinosaurs3.json').done((data3) => {
//     data3.dinosaurs3.forEach((dino) => {
//       dinosaurs.push(dino);
//     });
//     console.log(dinosaurs);
//   });
// };

//WRONG WAY
// const dinoGetter = () => {
//   firstDinosaurJSON().then((results) => {//.then()-happens when resolved // .catch()-happens when it rejects
//     results.forEach((dino) => {
//       dinosaurs.push(dino);
//     });
//     secondDinosaurJSON().then((results2) => {//.then()-happens when resolved // .catch()-happens when it rejects
//       results2.forEach((dino) => {
//         dinosaurs.push(dino);
//       });
//       thirdDinosaurJSON().then((results3) => {//.then()-happens when resolved // .catch()-happens when it rejects
//         results3.forEach((dino) => {
//           dinosaurs.push(dino);
//         });
//         console.log("dino array", dinosaurs);
//       });
//     });
//   }).catch((error) => {
//     console.log(error);
//   });
// };


},{"./dom":2}],2:[function(require,module,exports){
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


},{}],3:[function(require,module,exports){
'use strict';
const data = require('./data');

$(document).ready(() => {//document.ready doesn't run code until page is loaded.
  data.initializer();
});
},{"./data":1}]},{},[3]);
