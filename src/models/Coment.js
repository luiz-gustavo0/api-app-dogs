const { Sequelize, Model } = require('sequelize')

class Coment extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' })
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

module.exports = Coment
