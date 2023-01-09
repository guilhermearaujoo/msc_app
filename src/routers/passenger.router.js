// src/routers/passenger.router.js

const express = require('express');
const { passengerController } = require('../controllers');

const validateNewPassengerFields = require('../middlewares/validateNewPassengerFields');

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
  validateNewPassengerFields,
  passengerController.createPassenger,
);

module.exports = router;