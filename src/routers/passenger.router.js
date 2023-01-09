// src/routers/passenger.router.js

const express = require('express');
const { passengerController } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  passengerController.listPassengers,
);

router.get(
  '/:id',
  passengerController.getPassenger,
);

router.post(
  '/',
  passengerController.createPassenger,
);

module.exports = router;