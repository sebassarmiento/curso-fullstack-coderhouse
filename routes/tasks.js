const express = require('express');
const router = express.Router();

const List = require('../models/list')

router.get('/', (req, res) => {
    List.findById(req.listId).then(result => {
        res.status(200).json(result.tasks)
    })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.get('/:taskId', (req, res) => {
    List.findById(req.listId)
        .then(result => {
            let list = result.tasks.filter(task => task._id == req.params.taskId)
            list.length > 0 ? res.status(200).json(list) : res.status(404).json({message: "Task was not found"})
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.post('/', (req, res) => {
    List.findById(req.listId)
    .then(result => {
        result.tasks.push({
            description: req.body.description,
            done: false
        })
        return result.save()
    })
    .then(response => res.status(200).json({message: "Task was added"}))
    .catch(err => {
        res.status(500).json(err)
    })
})

router.put('/:taskId', (req, res) => {
    List.findById(req.listId)
    .then(result => {
        result.tasks.map(task => {
            if(task._id == req.params.taskId){
                task.description = re.body.description ? re.body.description : task.description
                task.done = req.body.done ? req.body.done : task.done
            }
        })
        return result.save()
    })
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err))
})

router.delete('/:taskId', (req, res) => {
    console.log(req.listId)
    List.findById(req.listId)
    .then(result => {
        result.tasks = result.tasks.filter(task => task._id != req.params.taskId)
        return result.save()
    })
    .then(response => {
        res.status(200).json({message: "Task was deleted"})
    })
    .catch(err => {
        console.log('SALE POR ERROR', err)
        res.status(404).json({
            message: "Could not delete task",
            error: err
        })
    })
})

module.exports = router