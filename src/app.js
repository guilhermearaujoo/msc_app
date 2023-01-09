const express = require('express');
const { passengerRouter } = require('./routers');
/* Removemos a importação do passengerService pois ele não é mais usado aqui! */
const { driverService } = require('./services');

const app = express();

app.use(express.json());

/* Adicionamos o registro das rotas para o CRUD de pessoas passageiras */
app.use('/passengers', passengerRouter);

/* Apagamos o código que ficava aqui! */

app.get('/drivers/open/travels', async (_req, res) => {
  const result = await driverService.getWaitingDriverTravels();
  res.status(200).json(result);
});

app.put('/drivers/:driverId/travels/:travelId/assign', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await driverService.travelAssign({ travelId, driverId });
  if (type) return res.status(type).json(message);
  
  res.status(200).json(message);
});

app.put('/drivers/:driverId/travels/:travelId/start', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await driverService.startTravel({ travelId, driverId });
  if (type) return res.status(type).json(message);

  res.status(200).json(message);
});

app.put('/drivers/:driverId/travels/:travelId/end', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await driverService.endTravel({ travelId, driverId });
  if (type) return res.status(type).json(message);

  res.status(200).json(message);
});

module.exports = app;
