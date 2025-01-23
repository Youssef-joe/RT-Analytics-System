const Order = require("./../models/order.js");
const { getIO } = require("./../socket.js")

let createOrder = async (req, res) => {
  const { product_id, quantity, price } = req.body;

  let order = new Order({ product_id, quantity, price });

  try {
    let saveOrder = await order.save();

    const io = getIO();

    io.emit("new_order", { type: "new_order", data: saveOrder });

    const analytics = await getAnalytics();
    io.emit("analytics_update", { type: "analytics_update", data: analytics });
    res.status(200).json({ id: saveOrder._id });
  } catch (err) {
    res.status(500).json({ error: err.message ? err.message : err });
  }
};

const getAnalytics = async () => {
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

  const totalRevenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ["$quantity", "$price"] } },
      },
    },
  ]);

  const topProducts = await Order.aggregate([
    {
      $group: {
        _id: "$product_id",
        totalSales: { $sum: { $multiply: ["$quantity", "$price"] } },
      },
    },
    { $sort: { totalSales: -1 } },
    { $limit: 5 },
  ]);

  const recentRevenue = await Order.aggregate([
    { $match: { date: { $gte: oneMinuteAgo } } },
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ["$quantity", "$price"] } },
      },
    },
  ]);

  const recentOrdersCount = await Order.countDocuments({
    date: { $gte: oneMinuteAgo },
  });

  return {
    totalRevenue: totalRevenue[0]?.total || 0,
    topProducts,
    recentRevenue: recentRevenue[0]?.total || 0,
    recentOrdersCount,
  };
};

module.exports = {
  createOrder,
};
