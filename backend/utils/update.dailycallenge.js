const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const updateDailyChallenge = (user) => {
  const today = new Date();

  if (!user.lastChallengeDate) {
    user.challengeCompletedToday = true;
    user.totalChallengesCompleted += 1;
    user.lastChallengeDate = today;
    return;
  }

  const lastChallengeDate = new Date(user.lastChallengeDate);

  if (!isSameDay(lastChallengeDate, today)) {
    user.challengeCompletedToday = true;
    user.totalChallengesCompleted += 1;
    user.lastChallengeDate = today;
  }
};

module.exports = updateDailyChallenge;