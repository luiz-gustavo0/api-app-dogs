const { Sequelize, Model } = require('sequelize')

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        url: Sequelize.STRING,
        peso: Sequelize.DECIMAL(5, 2),
        idade: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    this.hasMany(models.Coment, { foreignKey: 'post_id', as: 'coments' })
  }
}

module.exports = Post
