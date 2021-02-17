const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({

    recipients: [{ type: Schema.Types.ObjectId,
                   ref: 'users' }]
})


module.exports = Conversation = mongoose.model("conversation", ConversationSchema);