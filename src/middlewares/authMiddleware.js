const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const { promisify } = require('util')
const AppError = require('../errors/AppError')

module.exports = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new AppError(401, 'Not authorized')
    }

    const [, token] = authHeader.split(' ')

    const tokenDecoded = await promisify(jwt.verify)(token, authConfig.secret)

    request.userId = tokenDecoded.id

    return next()
  } catch (err) {
    return response.status(401).json(err)
  }
}
