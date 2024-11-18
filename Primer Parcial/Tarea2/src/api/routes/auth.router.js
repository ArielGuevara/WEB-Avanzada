const express = require('express');
const { config } = require('../config/config');

const { loginSchema } = require('../schemas/auth.schema');
const validatorHandler = require('../middlewares/validator.handler');
const AuthService = require('../services/auth.service');

const router = express.Router();
const service = new AuthService();

router.post('/login',
  validatorHandler(loginSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const token = await service.logIn(body);

      res.header("auth-token", token).json({
        error: null,
        data: {
          token,
        },
      });

    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;
