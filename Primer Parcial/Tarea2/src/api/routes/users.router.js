const express = require('express');

const UsersService = require('../services/user.service');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema } = require('../schemas/user.schema');
const validatorHandler = require('../middlewares/validator.handler');
const verifyToken = require('../middlewares/validate-token');

const router = express.Router();
const service = new UsersService();

router.get('/', verifyToken, async (req, res) => {
  const users = await service.find();
  res.json(users);
});
router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => { //luego el middleware de response
    const { id } = req.params;
    try {
      const user = await service.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newUser = await service.create(body);

      res.status(201).json({
        message: 'created',
        data: newUser,
      });
    } catch (error) {
      next(error);
      // res.json(error);
    }
  });
router.patch('/:id',
  verifyToken,
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    const { id } = req.params;
    try {
      const category = await service.update(id, body);

      res.status(200).json({
        message: 'updated',
        data: category
      });
    } catch (error) {
      next(error);
    }
  });
router.delete('/:id',
  verifyToken,
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);

      res.json({ rta });
    } catch (error) {
      next(error);
    }

  });

module.exports = router;
