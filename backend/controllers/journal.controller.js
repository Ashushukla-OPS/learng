
const JournalModel = require("../model/journal.model");
const UserModel = require("../model/user.model");
const updateStreak = require("../utils/update.streak")
const  updateDailyChallenge = require("../utils/update.dailycallenge")

const addJournalcontoller = async(req,res)=>{
    try{
        let {userId, topicName, description,studyDuration,difficultyLevel} = req.body

        if(!topicName||!description||!studyDuration||!difficultyLevel){
            return res.status(404).json({
                message:"All fields are required"
            })
        }
        const journal = await JournalModel.create({
                 userId: req.user._id, topicName, description,studyDuration,difficultyLevel
        })
    const user = await UserModel.findById(req.user._id);
        updateStreak(user);
     updateDailyChallenge(user); 

   await user.save()
    return res.status(201).json({
      success: true,
      message: "Journal entry added successfully",
      journal,
      user
    });
  } catch (error) {
    console.log("Add journal error", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getMyJournalcontroller = async (req, res) => {
  try {
    const userId = req.user._id
    const journals = await JournalModel.find({userId}).sort({
  createdAt: -1,
});  

    return res.status(200).json({
      success: true,
      count: journals.length,
      journals,
    });
    
  } catch (error) {
    console.log("Get journal error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getSingleJournalcontroller = async (req, res) => {
  try {
    const { id } = req.params;

    const journal = await JournalModel.findOne({
      _id: id,
      userId: req.user._id,
    });

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: "Journal entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      journal,
    });
  } catch (error) {
    console.log("Get single journal error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const updateJournalcontroller = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      topicName,
      description,
      studyDuration,
      difficultyLevel,
    } = req.body;

    const journal = await JournalModel.findOne({
      _id: id,
      userId: req.user._id,
    });

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: "Journal entry not found",
      });
    }

    journal.topicName = topicName || journal.topicName;
    journal.description = description || journal.description;
    journal.studyDuration = studyDuration || journal.studyDuration;
    journal.difficultyLevel = difficultyLevel || journal.difficultyLevel;

   const user = req.user

    
    await journal.save();

    return res.status(200).json({
      success: true,
      message: "Journal entry updated successfully",
      journal,
      
    });
  } catch (error) {
    console.log("Update journal error:", error.message);

    return res.status(500).json({

      success: false,
      message: "Internal server error",
      error:error.message
    });
  }
};
const deleteJournalcontroller = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedJournal = await JournalModel.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!deletedJournal) {
      return res.status(404).json({
        success: false,
        message: "Journal entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Journal entry deleted successfully",
    });
  } catch (error) {
    console.log("Delete journal error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
module.exports = {addJournalcontoller,getSingleJournalcontroller,deleteJournalcontroller,getMyJournalcontroller,updateJournalcontroller}
