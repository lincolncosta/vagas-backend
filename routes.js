const express = require('express')
const cors = require('cors')
const jobPositionsRouter = require('./job-positions/routes.js')
const usersRouter = require('./user/routes.js')

const app = express()

app.use(cors())

app.get('/', (_, res) => res.send('It works!'))
app.use('/job-positions', jobPositionsRouter)
app.use('/users', usersRouter)

module.exports = app