const Order = require("./../models/order.js");

let getAnalytics = async (req, res) => {
  let oneMinuteAgo = new Date(Date.now() - 60 * 1000);

  try {
   
    const total = await Order.aggregate([
      {
        $group: {
          _id: null, // Grouping all documents together
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } }, 
        },
      },
    ]);

 
    const topProducts = await Order.aggregate([
      {
        $group: {
          _id: "$product_id", // Grouping by product_id
          totalSales: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
      { $sort: { totalSales: -1 } }, // Sort by totalSales in descending order
      { $limit: 5 }, // Limit to top 5 products
    ]);

    // Revenue changes in the last 1 minute
    const recentRevenue = await Order.aggregate([
      { $match: { date: { $gte: oneMinuteAgo } } }, // Filter orders from the last 1 minute
      {
        $group: {
          _id: null, // Group all documents together
          recentRevenue: { $sum: { $multiply: ["$quantity", "$price"] } }, // Rename to recentRevenue
        },
      },
    ]);

    // Count of orders in the last 1 minute
    let recentOrderCount = await Order.countDocuments({
      date: { $gte: oneMinuteAgo },
    });

    
    res.json({
      totalRevenue: total[0]?.totalRevenue || 0, 
      topProducts,
      recentRevenue: recentRevenue[0]?.recentRevenue || 0, 
      recentOrderCount,
    });
  } catch (err) {
    console.error("Error in getAnalytics:", err.message ? err.message : err);
    res.status(500).json({ error: err.message ? err.message : err }); 
  }
};

module.exports = {
  getAnalytics,
};
