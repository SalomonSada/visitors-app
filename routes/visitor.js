const express = require('express');
const router = express.Router();
//const auth = require('../middleware/auth');

router.get('/', (req, res) => res.send('visitor working'));

module.exports = router;
