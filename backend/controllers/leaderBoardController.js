import User from '../models/User.js';

export const getTopUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ monthlyPoints: -1 })
      .limit(10)
      .select('userId monthlyPoints');
    res.json({ success: true, leaderboard: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
