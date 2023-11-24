const app = require('./app')
const port = process.env.PORT
<<<<<<< HEAD
app.use(express.json())
app.use(userRouters)
app.use(taskRouters)

=======
>>>>>>> main

app.listen(port, () => {
    console.log("server is running on port ", port)
})
