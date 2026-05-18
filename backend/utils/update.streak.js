const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const updateStreak = (user) => {
  const today = new Date();

  if (!user.lastLoggedDate) {
    user.currentStreak = 1;
    user.longestStreak = 1;
    user.lastLoggedDate = today;
    return;
  }

  const lastDate = new Date(user.lastLoggedDate);

  if (isSameDay(lastDate, today)) {
    return;
  }

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(lastDate, yesterday)) {
    user.currentStreak += 1;
  } else {
    user.currentStreak = 1;
  }

  if (user.currentStreak > user.longestStreak) {
    user.longestStreak = user.currentStreak;
  }

  user.lastLoggedDate = today;
};

module.exports = updateStreak;