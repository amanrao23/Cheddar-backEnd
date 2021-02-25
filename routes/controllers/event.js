const Event = require("../../models/Event");
const mongoose = require("mongoose");
const socketToken = require("../../socketToken.json");
const User = require("../../models/User");
const Conversation = require("../../models/Conversation");
// This
exports.getEvents = async (req, res) => {
  const { chatRoomId, timestamp, username } = req.body;
  try {
    if (socketToken[username] !== undefined) {
      let user = await User.findById(req.user.id);
      let userStatus = "online";
      let messageStatus = "read";
      socketToken[username].to(chatRoomId).emit("online", { userStatus });
      socketToken[user.username]
        .to(chatRoomId)
        .emit("readMessage", { messageStatus });
    }
    await Event.updateMany(
      {
        sender: { $ne: req.user.id },
      },
      {
        $set: { status: "read" },
      }
    );
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
            chatRoomId: { $last: "$chatRoomId" },
            status: { $last: "$status" },
          },
        },
      ]);
      // User.populate(events,{path:'sender'})
      console.log(events, "getEnets");

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
  console.log(req.body);

  try {
    let event = new Event({
      sender: req.user.id,
      type,
      messageId,
      text,
      chatRoomId,
    });
    await event.save();
    let users = await User.findById(req.user.id);
    console.log(event);

    socketToken[users.username].to(chatRoomId).emit("newEvent", { event });

    res.status(200).send(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.fetchEventsAfterOffline = async (req, res) => {
  // const { timestamp } = req.body;
  try {
    let conversations = await Conversation.find({
      recipients: { $elemMatch: { $eq: req.user.id } },
    });
    let results = [];

    conversations.map(async (conversation) => {
      let result = await Event.findOne({
        chatRoomId: conversation._id,
        status: "sent",
      });
      if (result) {
        results.append(conversation._id);
      }
    });
    res.status(200).send(results);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
