const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const userController= require('../controllers/user')


// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/',userController.registerUser);


// @route    POST api/users/conversations
// @desc     Get all conversations of a user
// @access   Private
router.get('/conversations',auth, userController.getConversations)


// @route    POST api/users/newconversation
// @desc     Create new conversation with a user
// @access   Private
router.post('/newConversation',auth, userController.newConversation)




module.exports = router;