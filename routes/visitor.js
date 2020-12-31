const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Visitor = require('../models/Visitor');

// @route   POST api/visitor
// @desc    Create or *update* visitor
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('cellphone', 'Cellphone is required').not().isEmpty(),
      check('direction', 'Direction is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, cellphone, direction } = req.body;

    const visitorFields = {};
    visitorFields.user = req.user.id;
    if (name) visitorFields.name = name;
    if (email) visitorFields.email = email;
    if (cellphone) visitorFields.cellphone = cellphone;
    if (direction) visitorFields.direction = direction;

    try {
      // check if the visitor exist
      let checkVisitor = await Visitor.findOne({ email });
      if (checkVisitor) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Visitor already exists' }] });
      }

      let visitor = await Visitor.findOne({ user: req.user.id });

      visitor = new Visitor(visitorFields);

      await visitor.save();

      res.json(visitor);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/visitor
// @desc    Get all visitors
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const visitors = await Visitor.find().populate();
    res.json(visitors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/visitor/:visitor_id
// @desc    Get Visitor by ID
// @access  Private
router.get('/:visitor_id', auth, async (req, res) => {
  try {
    const visitor = await Visitor.findOne({
      _id: req.params.visitor_id,
    }).populate();

    res.json(visitor);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/:visitor_id', auth, async (req, res) => {
  try {
    // Remove Visitor
    await Visitor.findOneAndRemove({ _id: req.params.visitor_id });
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
