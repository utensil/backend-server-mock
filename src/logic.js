'use strict';

const _ = require('lodash');

const REPEAT_COUNT = 1000;
const SUCCESS_RATE = 1.0;
const PI = 3.141592653589793238462643383279;
const MAX_TIMEOUT_IN_SECS = 10;
const THRESHOLD = 0.9;

const DUMMY_MAP = {
  'etc.': 'et cetera',
  'et.al': 'et altera',
  'i.e.': 'id est',
  'e.g.': 'exampli gratia',
  'vs.': 'versus',
  'Q.E.D.': 'quod erat demonstrandum',
  'dummy': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
};

const DUMMY_VALUES = _.values(DUMMY_MAP);

class Logic {
  constructor(config) {
    this.config = _.assign({}, {
      REPEAT_COUNT,
      SUCCESS_RATE,
      MAX_TIMEOUT_IN_SECS,
      THRESHOLD
    }, config);
  }

  doMath(req) {
    const REPEAT_COUNT = this.config.REPEAT_COUNT;

    return new Promise((resolve, reject) => {
      let res = 0;

      for (var i = 0; i < REPEAT_COUNT; i++) {
        res += Math.sin(Math.random() * i * PI);
      }

      this.__returnResult(res, resolve, reject);
    });
  }

  sleep(req) {
    const MAX_TIMEOUT_IN_SECS = this.config.MAX_TIMEOUT_IN_SECS;

    let seconds = (req || {}).seconds || Math.random() * MAX_TIMEOUT_IN_SECS;

    return new Promise((resolve, reject) => {
      setTimeout( () => {
        this.__returnResult(seconds, resolve, reject);
      }, seconds * 1000);
    });
  }

  query(req) {
    const THRESHOLD = this.config.THRESHOLD;

    return new Promise((resolve, reject) => {

      if (Math.random() < THRESHOLD) {
        let res = _.sample(DUMMY_VALUES);
        this.__returnResult(res, resolve, reject);
      } else {
        this.__returnResult(DUMMY_MAP.dummy, resolve, reject);
      }

    });
  }

  __returnResult(value, resolve, reject) {
    let rnd = Math.random();

    if(rnd <= this.config.SUCCESS_RATE) {
      resolve({
        status: true,
        value: value
      });
    } else {
      resolve({
        status: false
      });
    }
  }
}

module.exports = {
  Logic,
  DUMMY_VALUES
};
