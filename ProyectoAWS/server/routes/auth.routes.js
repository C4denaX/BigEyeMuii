const express = require('express');
const router = express.Router();

const user = require('../controllers/auth.controller');

router.post('/register', user.createUser);
router.post('/login', user.loginUser);

module.exports = router;


