const boom = require('@hapi/boom');
const bcrypt = require("bcryptjs");

const { User } = require('../db/models/'); // Importa el modelo de Mongoose

class UserService {
  constructor() {
    this.model = User;
  }

  async generate() {

  }

  async create(body) {
    try {
      const isEmailExist = await this.model.findOne({ email: body.email });

      if (isEmailExist) {
        throw boom.badData("Email already exists");
      }

      // hash the password
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(body.password, salt);

      const user = new User({
        name: body.name,
        email: body.email,
        password,
      });

      const newUser = await this.model.create(user);
      return newUser;
    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      throw boom.badRequest('Error creating user', error);
    }
  }

  async find() {
    try {
      const users = await this.model.find();
      return users;
    } catch (error) {
      throw boom.badImplementation('Error retrieving users', error);
    }
  }

  async findOne(id) {
    try {
      const user = await this.model.findById(id);
      if (!user) {
        throw boom.notFound('User not found');
      }
      return user;
    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      throw boom.badRequest('Error finding user', error);
    }
  }

  async update(id, changes) {
    try {
      const user = await this.findOne(id);

      Object.assign(user, changes);
      await user.save();
      return user;
    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      throw boom.badRequest('Error updating user', error);
    }
  }

  async delete(id) {
    try {
      const user = await this.findOne(id);

      await user.deleteOne();
      return {
        id,
        message: 'User deleted',
      };
    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      throw boom.badRequest('Error deleting user', error);
    }
  }
}

module.exports = UserService;
