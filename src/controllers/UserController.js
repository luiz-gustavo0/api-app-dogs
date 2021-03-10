const User = require('../models/User')
const Yup = require('yup')
const AppError = require('../errors/AppError')

class UserController {
  async create(request, response) {
    try {
      const userExists = await User.findOne({
        where: {
          email: request.body.email,
        },
      })

      if (userExists) {
        throw new AppError(409, 'Usuário já cadastrado.')
      }

      const schema = Yup.object()
        .shape({
          name: Yup.string().required(),
          email: Yup.string().email().required(),
          password: Yup.string().required().min(8),
        })
        .noUnknown()

      const validfields = await schema.validate(request.body, {
        abortEarly: false,
        stripUnknown: true,
      })

      const { id, name, email } = await User.create(validfields)

      return response.status(201).json({ user: { id, name, email } })
    } catch (err) {
      return response.status(400).json(err)
    }
  }
}

module.exports = new UserController()
