const Event = require("../../models/Event");
const mongoose = require("mongoose");

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
            sender: { $last: "$sender" },
            text: { $last: "$text" },
            type: { $last: "$type" },
            time: { $last: "$date" },
          },
        },
      ]);
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
      console.log(events,"getEnets")
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
    const saveEvent = await event.save();

    res.status(200).send(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
