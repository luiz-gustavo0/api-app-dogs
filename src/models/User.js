const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    )

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    })

    return this
  }

  async checkPassword(password) {
    return await bcrypt.compare(password, this.password_hash)
  }

  static associate(models) {
    this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' })
    this.hasMany(models.Coment, { foreignKey: 'user_id', as: 'comments' })
  }
}

module.exports = User
