const Todo = require('../models/todos');
const jwt = require('jsonwebtoken');


exports.createTodo = (req, res) => {
    const {authorization} = req.headers;
    const token =  authorization.replace('Bearer ', '');
    const email_id = jwt.verify(token, process.env.JWT_KEY)


    const newTodo = new Todo({
        email: email_id.email,
        title: req.body.title,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
    });
    newTodo.save().then(todo => res.json(todo)).catch(err => console.log(err))
}

exports.getTodos = (req, res) => {
    Todo.find({user: req.user._id}).then((todos) => res.json(todos)).catch(err => console.log(err))
}

exports.updateTodo = (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body, { new: true}).then(todo => res.json(todo)).catch(
        err => console.log(err)
    )
}

exports.deleteTodo = (req, res) => {
    Todo.findByIdAndRemove(req.params.id).then(() => {res.json({message: 'deleted'})}).catch(err => console.log(err))
}