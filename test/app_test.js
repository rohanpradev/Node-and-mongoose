const assert = require('assert');
const app = require('../app');
const request = require('supertest');

describe('The express app', () => {
  it('handles a get request to /api', (done) => {
    request(app)
      .get('/api')
      .end((err, response) => {
        assert(!err);
        assert(response.status === 200);
        done();
      });
  });
});
