const jwt = require('jsonwebtoken')
const User = require('../models/User')
const AppError = require('../errors/AppError')

const authConfig = require('../config/auth')

class AuthController {
  async create(request, response) {
    const { email, password } = request.body
    try {
      const user = await User.findOne({ where: { email } })

      if (!user) {
        throw new AppError(401, 'Email ou senha inválidos')
      }

      if (!(await user.checkPassword(password))) {
        throw new AppError(401, 'Email ou senha inválidos')
      }

      const { id, name } = user

      return response.json({
        user: { id, name, email },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      })
    } catch (err) {
      return response.status(400).json(err)
    }
  }
}

module.exports = new AuthController()
