import { Router } from "express";
import Todo from '../models/Todo';

const router = Router();

router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);

});

router.post('/', async (req, res) => {
    const { title } = req.body;
    const newTodo = new Todo({ title });
    await newTodo.save()
    res.status(201).json(newTodo);
});

router.put('/:id', async (req,res) => {
    const { id } = req.params;
    const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true});
    res.json(updated);
})

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(204).send();
});

export default router;
