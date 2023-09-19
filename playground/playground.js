const mongoose = require('../src/db/mongoose')
const Task = require("../src/models/tasks")


// Task.findByIdAndDelete('6502a9049b830ae105872457').then((tasks)=>{
//     console.log(tasks)
//     return Task.countDocuments({completed: false})
// }).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('6502c1b3d015e661f5ddd7ca').then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})