'use strict';

const REPEAT_COUNT = 1000;
const SUCCESS_RATE = 1.0;
const PI = 3.141592653589793238462643383279;
const MAX_TIMEOUT_IN_SECS = 10;
const THRESHOLD = 0.1;

const DUMMY_MAP = {
  'etc.': 'et cetera',
  'et.al': 'et altera',
  'i.e.': 'id est',
  'e.g.': 'exampli gratia',
  'vs.': 'versus',
  'Q.E.D.': 'quod erat demonstrandum',
  'dummy': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
};

const returnResult = (result, resolve, reject) => {
  let rnd = Math.random();

  if(rnd <= SUCCESS_RATE) {
    resolve({
      status: true,
      result: result
    });
  } else {
    resolve({
      status: false
    });
  }
};

module.exports = class Logic {
  constructor() {

  }

  doMath(req) {
    return new Promise(function(resolve, reject) {
      let ret = 0;

      for (var i = 0; i < REPEAT_COUNT; i++) {
        ret += Math.sin(Math.random() * i * PI);
      }

      returnResult(ret, resolve, reject);
    });
  }

  sleep(req) {
    let seconds = (req || {}).seconds || Math.random() * MAX_TIMEOUT_IN_SECS;

    return new Promise(function(resolve, reject) {
      setTimeout(function () {
        returnResult(seconds, resolve, reject);
      }, seconds * 1000);
    });
  }

  query(req) {
    return new Promise(function(resolve, reject) {
      let hasReturned = false;

      for(var key in DUMMY_MAP) {
        if (DUMMY_MAP.hasOwnProperty(key)) {
          if (Math.random() < THRESHOLD) {
            returnResult(DUMMY_MAP[key], resolve, reject);
            hasReturned = true;
            break;
          }
        }
      }

      if(!hasReturned) {
        returnResult(DUMMY_MAP.dummy, resolve, reject);
      }
    });
  }
}
