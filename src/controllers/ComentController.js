const Coment = require('../models/Coment')
const Post = require('../models/Post')

class ComentController {
  async create(request, response) {
    try {
      const { description } = request.body
      if (!description) {
        return response
          .status(400)
          .json({ message: 'E necessario uma descrição' })
      }

      const { post_id } = request.params
      const post = await Post.findByPk(post_id)

      if (!post) {
        return response.status(400).json({ message: 'Post não encontrado' })
      }

      const comment = await Coment.create({
        description,
        user_id: request.userId,
        post_id: post.id,
      })

      return response.status(201).json(comment)
    } catch (err) {
      return response.status(400).json(err)
    }
  }
}

module.exports = new ComentController()
