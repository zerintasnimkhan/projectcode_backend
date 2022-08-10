'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const { env, testDb } = require('../../config');

env.NODE_ENV = 'testing';

// Start node server
require('../node/index.js');

const expect = chai.expect;
chai.use(chaiHttp);

const HTML = fs.readFileSync('./client/index.html', 'utf-8');

const baseURL = 'http://localhost:3000';

const testMessage1 = {
  content: 'This is a mock message',
  authorId: true,
  timestamp: 1657187909428
};

describe('Node server', () => {

  beforeEach(() => {
    testDb.db.msgs = [testMessage1];
  });

  it('GET / responds index.html, status 200', done => {
    chai
      .request(baseURL)
      .get('/')
      .end((_, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', new RegExp('text/html'));
        expect(res.text).equal(HTML);
        done();
      });
  });

  it('POST /messages responds with status 201', done => {
    // Write your test here

  });

  it('GET /messages responds posted message, status 200', done => {
    // Write your test here

  });

});
