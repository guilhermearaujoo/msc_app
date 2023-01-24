const express = require('express');
const { passengerModel, travelModel, waypointModel } = require('./models');

const app = express();

app.use(express.json());

const WAITING_DRIVER = 1;
const DRIVER_ON_THE_WAY = 2;
const TRAVEL_IN_PROGRESS = 3;
const TRAVEL_FINISHED = 4;

const passengerExists = async (passengerId) => {
  const passenger = await passengerModel.findById(passengerId);
  if (passenger) return true;
  return false;
};

const saveWaypoints = (waypoints, travelId) => {
  if (waypoints && waypoints.length > 0) {
    return waypoints.map(async (value) => {
      await waypointModel.insert({
        address: value.address,
        stopOrder: value.stopOrder,
        travelId,
      });
    });
  }

  return [];
};

app.post('/passengers/:passengerId/request/travel', async (req, res) => {
  const { passengerId } = req.params;
  const { startingAddress, endingAddress, waypoints } = req.body;

  if (await passengerExists(passengerId)) {
    // Aqui substituímos o trecho de código SQL pela chamada a função insert do model
    // e armazenamos o retorno da função na variável travelId 
    const travelId = await travelModel.insert({ passengerId, startingAddress, endingAddress });

    // Renomeamos o parâmetro result.insertId para travelId
    await Promise.all(saveWaypoints(waypoints, travelId));

    // Aqui substituímos a consulta SQL pela nossa função findById
    const travel = await travelModel.findById(travelId);
    return res.status(201).json(travel);
  }
  res.status(500).json({ message: 'Ocorreu um erro' });
});

app.get('/drivers/open/travels', async (_req, res) => {
  const result = await travelModel.findByTravelStatusId(WAITING_DRIVER);
  res.status(200).json(result);
});

app.put('/drivers/:driverId/travels/:travelId/assign', async (req, res) => {
  const { travelId, driverId } = req.params;

  await travelModel.updateById(travelId, { driverId, travelStatusId: DRIVER_ON_THE_WAY });
  const travel = await travelModel.findById(travelId);

  res.status(200).json(travel);
});

app.put('/drivers/:driverId/travels/:travelId/start', async (req, res) => {
  const { travelId, driverId } = req.params;
  await travelModel.updateById(travelId, { driverId, travelStatusId: TRAVEL_IN_PROGRESS });
  const result = await travelModel.findById(travelId);
  res.status(200).json(result);
});

app.put('/drivers/:driverId/travels/:travelId/end', async (req, res) => {
  const { travelId, driverId } = req.params;
  await travelModel.updateById(travelId, { driverId, travelStatusId: TRAVEL_FINISHED });
  const result = await travelModel.findById(travelId);
  res.status(200).json(result);
});

module.exports = app;
