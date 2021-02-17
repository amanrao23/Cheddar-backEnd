const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authController= require('../controllers/auth')

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, authController.getUserByToken
);

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/', authController.authenticateUser);

module.exports = router;