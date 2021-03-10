const Yup = require('yup')
const AppError = require('../errors/AppError')
const Post = require('../models/Post')

class PostController {
  async index(request, response) {
    const { page = 1 } = request.query
    const posts = await Post.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          association: 'user',
          attributes: ['name', 'email'],
        },
        {
          association: 'coments',
          attributes: ['id', 'description'],
          include: [
            {
              association: 'user',
              attributes: ['name'],
            },
          ],
        },
      ],
    })

    return response.json(posts)
  }

  async create(request, response) {
    const file = request.file
    try {
      if (!file) {
        throw new AppError(400, 'O campo de imagem é obrigatorio')
      }

      const schema = Yup.object().shape({
        title: Yup.string().required(),
        peso: Yup.number().required().positive(),
        idade: Yup.number().positive().integer().required(),
      })

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
