const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    chatRoomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'conversation'
    },
    messageId:{
        type:Number,
        required:'true',
    },
    type: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})


module.exports = Event = mongoose.model("event", EventSchema);