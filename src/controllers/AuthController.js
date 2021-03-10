const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authConfig = require('../config/auth')

class AuthController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return response.status(401).json({ error: 'Not Authorized' })
    }

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ error: 'Email ou senha inválidos.' })
    }

    const { id, name } = user

    return response.json({
      user: { id, name, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

module.exports = new AuthController()
