const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Visitor = require('../models/Visitor');

// @route   POST api/visitor
// @desc    Create or *update* visitor
// @access  Private
router.post(
  '/',
  [auth, [check('name', 'El campo nombre es obligatorio').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      cellphone,
      direction,
      zip,
      birthday,
      amount,
      ages,
      _id,
      prayRequest,
      otherChurch,
    } = req.body;

    // visitor object
    const visitorFields = {};
    visitorFields.user = req.user.id;
    if (name) visitorFields.name = name;
    if (email) visitorFields.email = email;
    if (cellphone) visitorFields.cellphone = cellphone;
    if (direction) visitorFields.direction = direction;
    if (zip) visitorFields.zip = zip;
    if (birthday) visitorFields.birthday = birthday;
    if (prayRequest) visitorFields.prayRequest = prayRequest;
    if (otherChurch) visitorFields.otherChurch = otherChurch;

    // sons object
    visitorFields.sons = {};
    if (amount) visitorFields.sons.amount = amount;
    if (ages)
      visitorFields.sons.ages = ages.split(',').map((skill) => skill.trim());

    try {
      // Update
      let visitor = await Visitor.findOneAndUpdate(
        { _id },
        { $set: visitorFields },
        { new: true }
      );
      if (!visitor) {
        visitor = new Visitor(visitorFields);
        await visitor.save();
      }

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

// @route   DELETE api/visitor
// @desc    Delete visitor
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
