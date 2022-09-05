const express = require('express');
const { driverRouter, passengerRouter } = require('./routers');

const app = express();

app.use(express.json());
app.use('/passengers', passengerRouter);
app.use('/drivers', driverRouter);

module.exports = app;
