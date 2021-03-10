const { Sequelize, Model } = require('sequelize')

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        url: Sequelize.STRING,
        peso: Sequelize.DECIMAL(2, 2),
        idade: Sequelize.INTEGER,
        author: Sequelize.VIRTUAL,
        image: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

module.exports = Post
