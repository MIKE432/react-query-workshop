import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
const port = 4000;

interface Todo {
    id: number;
    name: string;
}

const todos: {[index: number]: Todo} = {}
app.use(bodyParser.json());
app.use(cors())
app.get('/api/todo', (req, res) => {
    const x = Object.entries(todos).map(([id, todo]) => todo)
    console.log(x)
    res.status(200).json(x)
});

app.get('/api/todo/:id', (req, res) => {
    const todoId = Number(req.params.id)
    const todo = todos[todoId];
    res.status(todo ? 200 : 404).json(todo);
});

app.post('/api/todo', (req, res) => {
    const newTodo: Todo = req.body
    console.log(newTodo)
    todos[newTodo.id] = newTodo;
    res.status(201).json(newTodo);
});

app.delete('/api/todo/:id', (req, res) => {
    const todoId = Number(req.params.id)
    const todo = todos[todoId]
    if (!todo) {
        res.status(404).send();
        return
    }
    delete todos[todoId]
    res.status(204).send();
});

app.put('/api/todo/:id', (req, res) => {
    const todoId = Number(req.params.id)
    if(todos[todoId]) {
    todos[todoId].name = req.body.name;
    res.status(200).json(todos[todoId]);
    }
    res.status(404).send();

});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});