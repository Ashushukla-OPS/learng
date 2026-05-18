const mongoose = require("mongoose")

const journalSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"user"
    },
    topicName:{
       type: String,
      required: true,
      trim: true,
    },
  
      description: {
      type: String,
      required: true,
    },

    studyDuration: {
      type: Number,
      required: true,
    },

    difficultyLevel:{
     type:String,
    },

    aiTip: {
      type: String,
      default: "",
    },

},
{ timestamps: true })

const JournalModel = mongoose.model("journal", journalSchema)

module.exports = JournalModel