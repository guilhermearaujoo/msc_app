const { driverService } = require('../services');
const errorMap = require('../utils/errorMap');

const openTravel = async (_req, res) => {
    const { type, message } = await driverService.getWaitingDriverTravels();
    if (type) return res.status(errorMap.mapError(type)).json(message);
    res.status(200).json(message);
};

module.exports = {
    openTravel,
};