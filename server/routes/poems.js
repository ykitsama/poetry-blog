const express = require('express');
const router = express.Router();
const Poem = require('../models/Poem');

// GET all poems (with optional tag filter)
router.get('/', async (req, res) => {
  const tag = req.query.tag;
  const filter = tag ? { tags: tag } : {};
  const poems = await Poem.find(filter).sort({ createdAt: -1 });
  res.json(poems);
});

// GET one poem by ID
router.get('/:id', async (req, res) => {
  const poem = await Poem.findById(req.params.id);
  res.json(poem);
});

// POST new poem
router.post('/', async (req, res) => {
  const { title, author, content, tags, imageUrl } = req.body;
  const poem = new Poem({ title, author, content, tags, imageUrl });
  await poem.save();
  res.json(poem);
});

// PUT edit poem
router.put('/:id', async (req, res) => {
  const { title, author, content, tags, imageUrl } = req.body;
  const poem = await Poem.findByIdAndUpdate(
    req.params.id,
    { title, author, content, tags, imageUrl, updatedAt: Date.now() },
    { new: true }
  );
  res.json(poem);
});

// DELETE poem
router.delete('/:id', async (req, res) => {
  await Poem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Poem deleted' });
});

module.exports = router;

