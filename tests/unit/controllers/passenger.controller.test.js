// tests/unit/controllers/passenger.controller.test.js

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { passengerService } = require('../../../src/services');
const { passengerController } = require('../../../src/controllers');
const {
  passengerListMock,
  newPassengerMock,
  listPassengerMock,
} = require('./mocks/passenger.controller.mock');

describe('Teste de unidade do passengerController', function () {
  describe('Listando as pessoas passageiras', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(passengerService, 'findAll')
        .resolves({ type: null, message: passengerListMock });

      // act
      await passengerController.listPassengers(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(passengerListMock);
    });
  });

  describe('Buscando uma pessoa passageira', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(passengerService, 'findById')
        .resolves({ type: null, message: newPassengerMock });

      // Act
      await passengerController.getPassenger(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newPassengerMock);
    });

    it('ao passar um id inválido deve retornar um erro', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 'abc' }, // passamos aqui um id inválido para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Definimos o dublê do service retornando o contrato definido.
      sinon
        .stub(passengerService, 'findById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      // Act
      await passengerController.getPassenger(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 422
      expect(res.status).to.have.been.calledWith(422); 
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith('"id" must be a number');
    });

    it('ao passar um id que não existe no banco deve retornar um erro', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 9999 }, // passamos aqui um id fictício para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Definimos o dublê do service retornando o contrato definido para esse cenário
      sinon
        .stub(passengerService, 'findById')
        .resolves({ type: 'PASSENGER_NOT_FOUND', message: 'Passenger not found' });

      // Act
      await passengerController.getPassenger(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 404
      expect(res.status).to.have.been.calledWith(404); 
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith('Passenger not found');
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});