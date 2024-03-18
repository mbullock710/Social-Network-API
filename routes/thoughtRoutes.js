const express = require('express');
const router = express.Router();
const { Thought } = require('../models/Thought');

router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const thought = await Thought.findById(id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedThought = await Thought.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedThought = await Thought.findByIdAndDelete(id);
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(deletedThought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
