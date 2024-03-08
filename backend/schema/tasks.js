const mongoose = require("mongoose");

const Tasks = new mongoose.Schema({
    taskId: { type: String, unique: true },
    task: { type: String, unique: false },
    completed: { type: String, unique: false },
    completeBy: { type: String, unique: false }
})

module.exports = Tasks