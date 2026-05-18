const JournalModel = require("../model/journal.model")
const UserModel = require("../model/user.model")

const dashboardcontroller = async(req,res)=>{

    try{
     let user = req.user
      const journals = await JournalModel.find({userId:user._id}).sort({createdAt:-1})
    


const totaljournals = journals.length

let totalduration=0;

journals.forEach((elem)=>{
 totalduration += elem.studyDuration

})
const recentJournals = journals.slice(0,5).map((elem)=>elem)

// const userdetails = await UserModel.findById({userId:user._id})
 const  longestStreak= user.longestStreak
 const currentStreak= user.currentStreak
 const totalbadgesearned= user.badges
  const totalchallangecompleted = user.totalChallengesCompleted
 
 const today = new Date();

const weekStart = new Date(today);
weekStart.setDate(today.getDate() - today.getDay());
weekStart.setHours(0, 0, 0, 0);

const weeklyJournals = journals.filter((journal) => {
  return new Date(journal.createdAt) >= weekStart;
});

let weeklyStudyHours = 0;

weeklyJournals.forEach((journal) => {
  weeklyStudyHours += journal.studyDuration;
});

const weeklyTopics = weeklyJournals.map((journal) => journal.topicName);

let weeklyReportMessage = "";

if (weeklyJournals.length === 0) {
  weeklyReportMessage =
    "No learning entries added this week. Start by logging one topic today.";
} else if (weeklyStudyHours < 5) {
  weeklyReportMessage =
    "You started learning this week. Try to increase your study time next week.";
} else if (weeklyStudyHours >= 5 && weeklyStudyHours < 15) {
  weeklyReportMessage =
    "Good progress this week. Keep learning consistently.";
} else {
  weeklyReportMessage =
    "Excellent work this week. You maintained strong learning effort.";
}

return res.status(200).json({
    message:"user dashboard",
      longestStreak,
      currentStreak,
      totalduration,
      totaljournals,
    recentJournals,
     totalchallangecompleted,
      weeklyJournals,
      weeklyTopics,
       weeklyReportMessage,
       weeklyStudyHours
 })

    }
    catch (error) {
    console.log("Dashboard error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
module.exports = dashboardcontroller