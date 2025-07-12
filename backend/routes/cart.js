import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Quest from '../models/Quest.js';

const router = express.Router();

function getTodayWeekday() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' });
}

// 🧮 copy your deterministic hash here
function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

router.post('/add', async (req, res) => {
  const { userId, productId } = req.body;
  const currentMonth = new Date().toISOString().slice(0,7);
  const today = getTodayWeekday();
  const dayIndex = new Date().getDay();

  try {
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({
        userId,
        monthlyPoints: 0,
        lastUpdatedMonth: currentMonth,
        quests: {},
        cart: []
      });
    }

    if (!user.cart.includes(productId)) {
      user.cart.push(productId);
    }

    if (user.lastUpdatedMonth !== currentMonth) {
      user.monthlyPoints = 0;
    }
    user.lastUpdatedMonth = currentMonth;

    const product = await Product.findById(productId);

    // 🟢 pick quest products exactly like frontend
    const allProducts = await Product.find({});
    const questProducts = allProducts
      .slice()
      .sort((a, b) => ((hash(a.name + dayIndex) % 100) - (hash(b.name + dayIndex) % 100)))
      .slice(0, 10);

    let earnedPoints = 0;
    if (questProducts.some(qp => qp._id.equals(product._id))) {
      earnedPoints += 20;
    }

    user.monthlyPoints += earnedPoints;
    await user.save();

    return res.json({
      success: true,
      earnedPoints,
      message: earnedPoints > 0 ? "Added to cart & quest completed!" : "Added to cart."
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.json({ cart: [] }); // no user -> empty cart
    }

    // user.cart is array of product IDs
    const products = await Product.find({
      _id: { $in: user.cart }
    });

    return res.json({ cart: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



export default router;