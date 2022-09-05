const express = require('express');
const { driverService } = require('../services');
const driverController = require('../controllers/driver.controller');

const router = express.Router();

router.get('/open/travels', driverController.openTravel);

router.put('/:driverId/travels/:travelId/assign', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await driverService.travelAssign({
    travelId,
    driverId,
  });

  if (type && type.endsWith('NOT_FOUND')) return res.status(404).json(message);
  if (type === 'TRAVEL_CONFLICT') return res.status(409).json(message);
  if (type === 'INVALID_VALUE') return res.status(422).json(message);

  return res.status(200).json(message);
});

router.put('/:driverId/travels/:travelId/start', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await driverService.startTravel({
    travelId,
    driverId,
  });

  if (type && type.endsWith('NOT_FOUND')) return res.status(404).json(message);
  if (type === 'TRAVEL_CONFLICT') return res.status(409).json(message);
  if (type === 'INVALID_VALUE') return res.status(422).json(message);

  return res.status(200).json(message);
});

router.put('/:driverId/travels/:travelId/end', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await driverService.endTravel({
    travelId,
    driverId,
  });

  if (type && type.endsWith('NOT_FOUND')) return res.status(404).json(message);
  if (type === 'TRAVEL_CONFLICT') return res.status(409).json(message);
  if (type === 'INVALID_VALUE') return res.status(422).json(message);

  return res.status(200).json(message);
});

module.exports = router;
