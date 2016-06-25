'use strict';

const expect = require('chai').expect;
const logic = require('../src/logic');
const debug = require('debug')('test');

describe('Logic', () => {

  const CONFIG = {
    SUCCESS_RATE: 1.0,
    MAX_TIMEOUT_IN_SECS: 1.0
  };

  let l;

  beforeEach((done) => {
    l = new logic.Logic(CONFIG);
    done();
  })

  it('can doMath()', function(done) {
    l.doMath().then((ret) => {
      expect(ret).to.be.ok;
      expect(ret.status).to.be.true;
      expect(ret.value).to.be.a('number');

      debug('doMath() =>', ret.value);

      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('can sleep()', function(done) {
    l.sleep().then((ret) => {
      expect(ret).to.be.ok;
      expect(ret.status).to.be.true;
      expect(ret.value).to.be.a('number');
      expect(ret.value).to.be.within(0, CONFIG.MAX_TIMEOUT_IN_SECS);

      debug('sleep() =>', ret.value);

      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('can query()', function(done) {
    l.query().then((ret) => {
      expect(ret).to.be.ok;
      expect(ret.status).to.be.true;
      expect(ret.value).to.be.a('string');
      expect(logic.DUMMY_VALUES).to.include(ret.value);
      debug('query() =>', ret.value);

      done();
    }).catch((err) => {
      done(err);
    });
  });
});
