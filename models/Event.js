const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'conversation'
    },
    messageNumber:{
        type:Number,
        required:'true',
    },
    type: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    }
})


module.exports = Event = mongoose.model("event", EventSchema);