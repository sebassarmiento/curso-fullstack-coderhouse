const express = require('express');
const router = express.Router();

const List = require('../models/list')

const tasksRouter = require('./tasks')

router.use('/:listId/tasks', (req, res, next) => {
  req.listId = req.params.listId
  next()
} , tasksRouter)

router.get('/', (req, res) => {
  List.find().then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

router.get('/:listId', (req, res) => {
  List.findById(req.params.listId).then(result => {
    result ? res.status(200).json(result) : res.status(404).json(err)
  })
  .catch(err => {
    res.status(500).json({
      message: "List was not found"
    })
  })
});

router.post('/', (req, res) => {
  const list = new List({
    name: req.body.name,
    tasks: req.body.tasks
  })
  list.tasks.map(task => task.done = false)
  list.save()
  .then(result => {
    res.status(200).json({
      message: 'List added',
      list: result
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
});

router.delete('/:listId', (req, res) => {
  List.findByIdAndDelete(req.params.listId)
  .then(result => {
    res.status(200).json({
      message: "List was deleted succesfully"
    })
  })
  .catch(err => {
    res.status(404).json({
      message: "List was not found",
      error: err
    })
  })
})

module.exports = router;
