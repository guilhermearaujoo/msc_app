const express = require('express');
/* Removemos a importação do driverService pois ele não é mais usado aqui
e importamos o objeto driverRoutes! */
const { passengerRouter, driverRoutes } = require('./routers');

const app = express();

app.use(express.json());

/* Adicionamos o registro das rotas para o CRUD de pessoas passageiras */
app.use('/passengers', passengerRouter);

/* Aqui apagamos todos o código que movemos para o do router de pessoas motoristas
e associamos o mesmo para ser responsável por qualquer rota que começar com /drivers */
app.use('/drivers', driverRoutes);

module.exports = app;