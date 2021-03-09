require('dotenv/config')
const express = require('express')
const morgan = require('morgan')

require('./database')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

module.exports = app
