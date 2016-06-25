'use strict';

const _ = require('lodash');
const expect = require('chai').expect;
const logic = require('../src/logic');
const debug = require('debug')('test');

const DELTA = 0.2;

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

  it('can alterConfig()', (done) => {
    const NEW_REPEAT_COUNT = 100;
    let oldConfig = _.cloneDeep(l.config);

    l.alterConfig({
      config: {
        REPEAT_COUNT: NEW_REPEAT_COUNT
      }
    }).then( (ret) => {
      expect(ret).to.be.ok;
      expect(ret.status).to.be.true;
      expect(ret.value).to.be.a('object');

      let newConfig = ret.value;
      debug('alterConfig() =>', newConfig);

      expect(newConfig.REPEAT_COUNT).to.not.equal(oldConfig.REPEAT_COUNT);
      expect(newConfig.REPEAT_COUNT).to.equal(NEW_REPEAT_COUNT);
      expect(newConfig.SUCCESS_RATE).to.equal(oldConfig.SUCCESS_RATE);
      expect(newConfig.MAX_TIMEOUT_IN_SECS).to.equal(oldConfig.MAX_TIMEOUT_IN_SECS);
      expect(newConfig.THRESHOLD).to.equal(oldConfig.THRESHOLD);

      done();
    }).catch(done);
  });

  it('can doMath()', (done) => {
    l.doMath().then((ret) => {
      expect(ret).to.be.ok;
      expect(ret.status).to.be.true;
      expect(ret.value).to.be.a('number');

      debug('doMath() =>', ret.value);

      done();
    }).catch(done);
  });

  it('can sleep()', (done) => {
    let start = new Date();

    l.sleep().then((ret) => {
      let end = new Date();

      expect(ret).to.be.ok;
      expect(ret.status).to.be.true;
      expect(ret.value).to.be.a('number');
      expect(ret.value).to.be.within(0, CONFIG.MAX_TIMEOUT_IN_SECS);

      let sleptSeconds = (end - start) / 1000;
      expect(sleptSeconds).to.be.closeTo(ret.value, ret.value * DELTA);

      debug('sleep() =>', ret.value);

      done();
    }).catch(done);
  });

  it('can query()', (done) => {
    l.query().then((ret) => {
      expect(ret).to.be.ok;
      expect(ret.status).to.be.true;
      expect(ret.value).to.be.a('string');
      expect(logic.DUMMY_VALUES).to.include(ret.value);
      debug('query() =>', ret.value);

      done();
    }).catch(done);
  });

  it('can fail definitively', function(done) {
    l.config = {
      SUCCESS_RATE: 0.0
    };

    l.doMath().then((ret) => {
      expect(ret).to.be.ok;
      expect(ret.status).to.be.false;

      return l.sleep();
    }).then((ret) => {
      expect(ret).to.be.ok;
      expect(ret.status).to.be.false;

      return l.query();
    }).then((ret) => {
      expect(ret).to.be.ok;
      expect(ret.status).to.be.false;

      done();
    }).catch(done);
  });

  it('can fail statistically', function(done) {

    const REPEAT_COUNT = logic.REPEAT_COUNT;
    const SUCCESS_RATE = 0.6;

    l.config = {
      SUCCESS_RATE: SUCCESS_RATE
    };

    let counter = 0;
    let success_counter = 0;


    const handleCycle = (ret) => {
      expect(ret).to.be.ok;

      if (ret.status) {
        success_counter += 1;
      }

      counter += 1;

      if (counter < REPEAT_COUNT) {
        l.doMath().then(handleCycle).catch(done);
      } else {
        let success_rate = (success_counter + 0.0) / counter;
        expect(success_rate).to.be.closeTo(SUCCESS_RATE, SUCCESS_RATE * DELTA);
        done();
      }
    };

    l.doMath().then(handleCycle).catch(done);
  });
});
