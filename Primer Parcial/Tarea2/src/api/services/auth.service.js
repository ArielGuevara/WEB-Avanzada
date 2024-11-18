const boom = require('@hapi/boom');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");

const { User } = require('../db/models'); // Importa el modelo de Mongoose

class AuthService {
  constructor() {
    this.model = User;
  }

  async logIn(body) {
    const user = await User.findOne({ email: body.email });

    if (!user) {
      throw boom.badRequest("Email no registrado");
    }

    console.log(config);
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) {
      throw boom.badRequest("Password incorrecta");
    }
    // create token
    const token = jwt.sign(
      // payload data
      {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      config.tokenSecret,
      { expiresIn: 60 * 60 } // 1 hora
    );
    return token;
  }
}

module.exports = AuthService;
