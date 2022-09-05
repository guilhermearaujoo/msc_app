const express = require('express');
const passengerController = require('../controllers/passenger.controller');

// Aqui estamos importando nosso middleware de validação
const validateRequestTravelSchema = require('../middlewares/validatePassengerFields');

const router = express.Router();

// Aqui estamos adicionando o middleware de validação na cadeia de processamento
// dos middlewares. Ele será executado antes da requisição ser transferida ao controller
router.post(
  '/:passengerId/request/travel',
  validateRequestTravelSchema,
  passengerController.createTravel,
);

module.exports = router;
