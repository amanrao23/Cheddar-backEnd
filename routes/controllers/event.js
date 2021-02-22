const Event = require("../../models/Event");
const mongoose = require("mongoose");
const socketToken = require("../../socketToken.json");
const User = require("../../models/User");
// This
exports.getEvents = async (req, res) => {
  const { chatRoomId, timestamp } = req.body;
  // console.log(mongoose.Types.ObjectId.isValid(chatRoomId));]
  try {
    if (!timestamp) {
      let events = await Event.aggregate([
        
        {
          $match: {
            chatRoomId: new mongoose.Types.ObjectId(chatRoomId),
          },
        },

        { $sort: { date: 1 } },
        {
          $group: {
            _id: "$messageId",
            messageId: { $last: "$messageId" },
            sender: { $last: "$sender" },
            text: { $last: "$text" },
            type: { $last: "$type" },
            date: { $last: "$date" },
            chatRoomId:{$last: "$chatRoomId"},
          },
        },
      ]);
      // User.populate(events,{path:'sender'})
      console.log(events,"getEnets")
      

      res.status(200).send(events);
    } else {
      let events = await Event.aggregate([
        {
          $match: {
            date: { $gt: new Date(timestamp) },
            chatRoomId: new mongoose.Types.ObjectId(chatRoomId),

          },
        },

        { $sort: { date: 1 } },
        {
          $group: {
            _id: "$messageId",
            sender: { $last: "$sender" },
            text: { $last: "$text" },
            type: { $last: "$type" },
            time: { $last: "$date" },
          },
        },
        
      ]);
      res.status(200).send(events);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.newEvent = async (req, res) => {
  const { chatRoomId, type, messageId, text } = req.body;
  try {
    let event = new Event({
      sender: req.user.id,
      type,
      messageId,
      text,
      chatRoomId,
    });
    await event.save();
    let users=await User.findById(req.user.id)
    console.log(socketToken[users.username].id, users.username)
    socketToken[users.username].to(chatRoomId).emit("newEvent", {event});

    res.status(200).send(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.fetchEventsAfterOffline =async(req,res)=>{

  const {timestamp}=req.body;
  try {
    let events = await Event.aggregate([
      {
        $match: {
          date: { $gt: new Date(timestamp) },
          chatRoomId: new mongoose.Types.ObjectId(chatRoomId),
        },
      },

      { $sort: { date: 1 } },
      {
        $group: {
          _id: "$messageId",
          sender: { $last: "$sender" },
          text: { $last: "$text" },
          type: { $last: "$type" },
          time: { $last: "$date" },
        },
      },
    ]);
    res.status(200).send(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
}