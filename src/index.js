const express = require('express')
require("./db/mongoose")
const userRouters = require('../src/routers/users')
const taskRouters = require('../src/routers/tasks')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouters)
app.use(taskRouters)


app.listen(port, () => {
    console.log("server is running on port ", port)
})



