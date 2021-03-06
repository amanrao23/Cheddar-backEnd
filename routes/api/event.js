const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const eventController= require('../controllers/event')


// @route    GET api/event
// @desc     GET messages of a conversation
// @access   Private
router.post('/getEvents',auth, eventController.getEvents);

// @route    POST api/event
// @desc     Create a new event
// @access   Private
router.post('/newEvent',auth, eventController.newEvent);

router.get('/offlineEvents',auth, eventController.fetchEventsAfterOffline)
module.exports = router;