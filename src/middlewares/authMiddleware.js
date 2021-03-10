const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const { promisify } = require('util')

module.exports = async (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ error: 'Not authorized.' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const tokenDecoded = await promisify(jwt.verify)(token, authConfig.secret)

    request.userId = tokenDecoded.id

    return next()
  } catch (err) {
    console.log('Error authMiddleware', err)
    return response.status(401).json({ error: 'Not authorized.' })
  }
}
