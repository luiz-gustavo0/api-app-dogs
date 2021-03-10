const AppError = require('../errors/AppError')
const Coment = require('../models/Coment')
const Post = require('../models/Post')

class ComentController {
  async create(request, response) {
    try {
      const { description } = request.body
      if (!description) {
        throw new AppError(400, 'E necessario uma descrição')
      }

      const { post_id } = request.params
      const post = await Post.findByPk(post_id)

      if (!post) {
        throw new AppError(400, 'Post não encontrado')
      }

      const comment = await Coment.create({
        description,
        user_id: request.userId,
        post_id: post.id,
      })

      return response.status(201).json(comment)
    } catch (err) {
      throw new AppError(400, err)
    }
  }
}

module.exports = new ComentController()
