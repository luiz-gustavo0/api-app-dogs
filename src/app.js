require('dotenv/config')
const express = require('express')
const morgan = require('morgan')
const AppError = require('./errors/AppErros')
const router = require('./routes')

require('./database')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(router)

// eslint-disable-next-line no-unused-vars
app.use((err, request, response, _next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    })
  }

  return response.status(500).json({
    status: 'Error',
    message: `Internal server error ${err.message}`,
  })
})

module.exports = app
