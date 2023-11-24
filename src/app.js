const express = require('express')
require("./db/mongoose")
const userRouters = require('../src/routers/users')
const taskRouters = require('../src/routers/tasks')

const app = express()

app.use(express.json())
app.use(userRouters)
app.use(taskRouters)

module.exports = app