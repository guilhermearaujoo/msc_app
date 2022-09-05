const { travelModel } = require('../models');

const WAITING_DRIVER = 1;

const getWaitingDriverTravels = async () => {
  const result = await travelModel.findByTravelStatusId(WAITING_DRIVER);
  return { type: null, message: result }; 
};

module.exports = {
  getWaitingDriverTravels,
};
