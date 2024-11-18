const express = require('express');
const usersRouter = require('./users.router');
const loginRouter = require('./auth.router');

function routerApi(app) {

  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', usersRouter);
  router.use('/auth', loginRouter);

  // Manejo de rutas no existentes
  router.use('*', (req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });

  // Manejo de métodos no permitidos
  app.use('/api/v1', (req, res) => {
    res.status(405).json({ error: `Método ${req.method} no permitido en esta ruta` });
  });
}

module.exports = routerApi;
