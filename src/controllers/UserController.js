const User = require('../models/User')
const Yup = require('yup')

class UserController {
  async create(request, response) {
    const userExists = await User.findOne({
      where: {
        email: request.body.email,
      },
    })

    if (userExists) {
      return response.status(409).jsoj({ error: 'Usuário já cadastrado.' })
    }

    const schema = Yup.object()
      .shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8),
      })
      .noUnknown()

    try {
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
