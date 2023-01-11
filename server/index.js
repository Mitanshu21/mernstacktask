const express = require('express');
const app = express();
const PORT = 5000;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(express.json());
app.use(cors());

const User = require('./models/user');
const Todos = require('./models/todos');

const mongoose = require('mongoose');
// const { default: Todos } = require('../client/src/component/Todos');
mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.MONGO_API,
    {
        dbname: process.env.DB_NAME
    },
    err => (err ? console.log(err) : console.log('connected to database'))
);


app.get('/', (req, res) => {
    res.send('working');
});

app.post('/login', (req, res) => {
    if(req.body.email === 'test@gmail.com' && req.body.password === 'Test@#123'){
        const token = jwt.sign({ email: req.body.email}, process.env.JWT_KEY);
        res.json({token});
    } else {
        res.status(401).json({message: 'invalid email or password'})
    }
})


const todosController = require('./controller/todoController');
const auth = require('./middleware/UserLogin')


app.get('/todos', auth, (req, res) => {
    Todos.find({user: req.user?._id}, (err, todos) => {
        if(err){
            return res.status(400).json({error: 'no todo found'})
        }
        res.json(todos);
    })
})

app.post('/todos',auth, todosController.createTodo);
app.put('/todos/:id', auth, todosController.updateTodo);
app.delete('/todos/:id', auth, todosController.deleteTodo);

app.listen(PORT, () => console.log('running on port', PORT))