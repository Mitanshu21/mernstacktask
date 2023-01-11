const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: ObjectId,
        ref: 'user'
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Todos = mongoose.model('todos', todoSchema);
module.exports = Todos;