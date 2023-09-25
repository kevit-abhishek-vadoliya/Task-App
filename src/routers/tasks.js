const express = require("express")
const routers = new express.Router()
const Task = require("../models/tasks")
const auth = require('../middleware/auth')

routers.post("/tasks", auth,async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

routers.get("/tasks", auth, async (req, res) => {
    const match = {}
    let tasks
    if(req.query.completed){
        match.completed = req.query.completed === "true"
    }
    try {
        if(match.completed===undefined){
            tasks = await Task.find({
                owner: req.user._id
            })
        }
        else{
            tasks = await Task.find({
                'owner': req.user._id,
                completed: match.completed
            })
        }
        res.send(tasks)
    }
    catch (e) {
        res.status(404).send(e)
    }
})

routers.get("/tasks/:id", auth, async (req, res) => {

    const _id = req.params.id

    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({_id, 'owner': req.user._id})
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    }
    catch (e) {
        res.status(500).send(e)
    }

})

routers.patch("/tasks/:id", auth ,async (req, res) => {
    const updates = Object.keys(req.body)
    const availableUpdates = ["description", "completed"]
    const isUpdatable = updates.every((update) => availableUpdates.includes(update))

    if (!isUpdatable) {
        return res.status(400).send({ "Error": "Property not updatable" })
    }
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send("Task not found")
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

routers.delete("/tasks/:id", auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = routers