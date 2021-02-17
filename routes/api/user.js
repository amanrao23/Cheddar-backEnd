const express = require('express');
const router = express.Router();
const userController= require('../controllers/user')


// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
    '/',userController.registerUser
  );
  
  module.exports = router;