const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('Posts to /api/drivers creates a new driver', (done) => {
    Driver.countDocuments().then((cnt) => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          Driver.countDocuments().then((newCnt) => {
            assert(newCnt === cnt + 1);
            done();
          });
        });
    });
  });

  it('Put to /api/drivers/:id edits an existing driver', (done) => {
    const driver = new Driver({ email: 'testing@test.com', driving: false });

    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: 'testing@test.com' }).then((driver) => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it('deletes to /api/drivers/:id can delete a driver', (done) => {
    const driver = new Driver({ email: 'test@test.com' });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: 'test@test.com' }).then((driver) => {
            assert(driver === null);
            done();
          });
        });
    });
  });

  it('GET to /api/drivers finds drivers in a location', (done) => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: {
        type: 'Point',
        coordinates: [-122.4759902, 47.6147628],
      },
    });
    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: {
        type: 'Point',
        coordinates: [-80.253, 25.791],
      },
    });

    Promise.all([seattleDriver.save, miamiDriver.save()]).then(() => {
      request(app)
        .get('/api/drivers?lng=-80&lat=25')
        .end((err, response) => {
          assert(response.body.length == 1);
          assert(response.body[0].email === 'miami@test.com');
          done();
        });
    });
  });
});
