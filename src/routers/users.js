const express = require("express")
const routers = new express.Router()
const User = require("../models/users")
const auth = require('../middleware/auth')

routers.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

routers.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }
    catch (e) {
        res.status(400).send()

    }
})


routers.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save() 
        res.send()
    }
    catch(e){
        req.status(500).send(e)

    }

})

routers.post('/users/logoutAll', auth, async (req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send(e)
    }
})

routers.get("/users/me", auth, async (req, res) => {
    res.send(req.user)
})
   

routers.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const availableUpdates = ["name", "email", "age", "password"]
    const isUpdatable = updates.every((update) => availableUpdates.includes(update))

    if (!isUpdatable) {
        return res.status(400).send({ "error": "property not updatable" })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

routers.delete("/users/me", auth,async (req, res) => {
    try {
      const user = await User.findOneAndDelete({_id: req.user._id})
        res.send(user)
    }
    catch (e) {
       console.log(e)
        res.status(500).send(e)
    }
})

module.exports = routers