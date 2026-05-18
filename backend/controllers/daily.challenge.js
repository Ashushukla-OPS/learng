
const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};


const getDailyChallengeController = async (req, res) => {
  try {
    const user = req.user;

    const now = new Date();

    const tenPM = new Date();
    tenPM.setHours(22, 0, 0, 0);

    let timeRemaining = tenPM - now;

    if (timeRemaining < 0) {
      timeRemaining = 0;
    }

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );

if (user.lastChallengeDate) {
  const isCompletedToday = isSameDay(now, new Date(user.lastChallengeDate));

  if (!isCompletedToday) {
    user.challengeCompletedToday = false;
  }
} else {
  user.challengeCompletedToday = false;
}



    return res.status(200).json({
      success: true,
      timeRemaining: {
        hours,
        minutes,
      },
    user
    });
  } catch (error) {
    console.log("Daily challenge error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = getDailyChallengeController;