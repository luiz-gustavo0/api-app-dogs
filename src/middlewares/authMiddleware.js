const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const { promisify } = require('util')
const AppError = require('../errors/AppErros')

module.exports = async (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError(401, 'Not authorized')
  }

  const [, token] = authHeader.split(' ')

  try {
    const tokenDecoded = await promisify(jwt.verify)(token, authConfig.secret)

    request.userId = tokenDecoded.id

    return next()
  } catch (err) {
    throw new AppError(401, 'Not authorized')
  }
}
