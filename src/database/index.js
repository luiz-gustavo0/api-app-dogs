const Sequelize = require('sequelize')
const databaseConfig = require('../config/database')
const Coment = require('../models/Coment')
const Post = require('../models/Post')
const User = require('../models/User')

const models = [User, Post, Coment]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }
}

module.exports = new Database()
