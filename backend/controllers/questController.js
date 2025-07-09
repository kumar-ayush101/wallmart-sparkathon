import User from '../models/User.js';
import Quest from '../models/Quest.js';

function getTodayWeekday() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' });
}
function getCurrentMonthKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
}

export const updateProgress = async (req, res) => {
  try {
    const { userId, tags } = req.body;
    if (!userId || !Array.isArray(tags)) 
      return res.status(400).json({ error: 'Invalid input' });

    const today = getTodayWeekday();
    const monthKey = getCurrentMonthKey();
    let user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.lastUpdatedMonth !== monthKey) {
      user.monthlyPoints = 0;
      user.lastUpdatedMonth = monthKey;
    }

    const quests = await Quest.find({ dayOfWeek: today });
    let completedQuests = [];
    let pointsEarned = 0;

    for (const quest of quests) {
      if (tags.includes(quest.tag)) {
        const key = `${quest.id}_${today}`;
        const entry = user.quests.get(key) || { progress: 0, completed: false };

        if (!entry.completed) {
          entry.progress += 1;
          if (entry.progress >= quest.goal) {
            entry.completed = true;
            completedQuests.push(quest.id);
            pointsEarned += quest.points;
          }
          user.quests.set(key, entry);
        }
      }
    }

    user.monthlyPoints += pointsEarned;
    await user.save();

    return res.json({ success: true, completed: completedQuests, pointsEarned, monthlyPoints: user.monthlyPoints });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
