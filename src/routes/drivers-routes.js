const express = require('express');
const driverController = require('../controller/drivers-controller');
const router = express.Router();

router.route('/').get(driverController.index).post(driverController.createDriver);

router.route('/:id').put(driverController.updateDriver).delete(driverController.deleteDriver);

module.exports = router;
