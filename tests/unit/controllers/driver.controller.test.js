const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { driverService } = require('../../../src/services');
const driverController = require('../../../src/controllers/driver.controller');

describe('Verificando controller de Driver', function () {
  describe('Teste de unidade do driverController', function () {
    it('Buscando as viagens em aberto quando não tem nenhuma viagem cadastrada', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(driverService, 'getWaitingDriverTravels')
        .resolves({ type: null, message: [] });

      await driverController.openTravel(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([]);
    });

    afterEach(sinon.restore);
  });

  describe('Atribuições de viagem com erros de id inexistente', function () {
    it('driverId inexistente status 404 e mensagem driverId not found', async function () {
      const res = {};
      const req = { params: { travelId: 1, driverId: 9999 }, body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(driverService, 'travelAssign')
        .resolves({
          type: 'DRIVER_NOT_FOUND',
          message: '"driverId" not found',
        });

      await driverController.travelAssign(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: '"driverId" not found',
      });
    });
  });
});
