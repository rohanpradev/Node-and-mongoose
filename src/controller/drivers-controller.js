const Driver = require('../models/driver-model');

const getDrivers = (req, res, next) => {
  Driver.find({})
    .limit(10)
    .then((drivers) => res.send({ results: drivers }))
    .catch(next);
};

const createDriver = (req, res, next) => {
  Driver.create(req.body)
    .then((driver) => {
      res.status(204).send(driver);
    })
    .catch(next);
};

const updateDriver = (req, res, next) => {
  const driverId = req.params.id;
  Driver.findByIdAndUpdate(driverId, req.body)
    .then(() => Driver.findById(driverId))
    .then((driver) => res.send(driver))
    .catch(next);
};

const deleteDriver = (req, res, next) => {
  Driver.findByIdAndDelete(req.params.id)
    .then((driver) => {
      res.status(204).send(driver);
    })
    .catch(next);
};

const index = (req, res, next) => {
  const { lng, lat } = req.query;
  const point = {
    type: 'Point',
    coordinates: [parseFloat(lng), parseFloat(lat)],
  };
  Driver.aggregate([
    {
      $geoNear: {
        near: point,
        spherical: true,
        maxDistance: 200000,
        distanceField: 'dist.calculated',
      },
    },
  ])
    .then((drivers) => res.send(drivers))
    .catch(next);
};

module.exports = { getDrivers, createDriver, updateDriver, deleteDriver, index };
