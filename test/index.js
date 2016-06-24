'use strict';

const expect = require('chai').expect;
const Logic = require('../src/logic');

describe('Logic', () => {

  let logic;

  beforeEach((done) => {
    logic = new Logic();
    done();
  })

  it('can doMath()', function(done) {
    logic.doMath().then((ret) => {
      done();
    });
  });

  it('can sleep()', function(done) {
    logic.sleep().then((ret) => {
      done();
    });
  });

  it('can query()', function(done) {
    logic.query().then((ret) => {
      done();
    });
  });
});
