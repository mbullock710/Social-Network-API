const express = require('express');
const router = express.Router();
const { Thought } = require('../models/Thought');
const { Reaction } = require('../models/Reaction');

router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const reaction = await Reaction.create(req.body);
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: reaction._id } },
      { new: true }
    );
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/reactions/:reactionId', async (req, res) => {
  try {
    const { reactionId } = req.params;
    const reaction = await Reaction.findByIdAndDelete(reactionId);
    res.json(reaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
