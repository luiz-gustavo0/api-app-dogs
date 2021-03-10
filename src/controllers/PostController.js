const Yup = require('yup')
const Post = require('../models/Post')

class PostController {
  async create(request, response) {
    const file = request.file

    if (!file) {
      return response
        .status(400)
        .json({ message: 'O campo de imagem é obrigatorio' })
    }

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      peso: Yup.number().required().positive(),
      idade: Yup.number().positive().integer().required(),
    })

    try {
      const validFields = await schema.validate(request.body, {
        abortEarly: false,
        stripUnknown: true,
      })

      const post = await Post.create({
        ...validFields,
        url: file.location,
        user_id: 2,
      })

      return response.status(201).json(post)
    } catch (err) {
      return response.status(400).json(err)
    }
  }
}

module.exports = new PostController()
