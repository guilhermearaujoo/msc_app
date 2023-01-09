// tests/unit/mocks/passenger.controller.mock

// Vamos utilizar esse objeto como mock da função createPassenger que ainda vamos implementar.
const passengerMock = {
  name: 'Bruce Lane',
  email: 'bruce.lane@acme.com',
  phone: '(77) 8179-0943',
};

// Vamos utilizar esse objeto como mock da função createPassenger que ainda vamos implementar.
const newPassengerMock = { id: 1, ...passengerMock };

// Esse é o array que utilizamos no teste da função findAll, reaproveitando o objeto newPassengerMock
const passengerListMock = [newPassengerMock];

module.exports = {
  passengerMock,
  newPassengerMock,
  passengerListMock,
};