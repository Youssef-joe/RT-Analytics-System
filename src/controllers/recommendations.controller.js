const axios = require("axios");
const Order = require("./../models/order.js");

let getRecommendations = async (req, res) => {
  try {
    let salesData = await Order.aggregate([
      {
        $group: {
          _id: "$product_id",
          totalSales: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
      { $sort: { totalSales: -1 } },
      { $limit: 5 },
    ]);

    let prompt = `Given this sales data, which products should we prompt for higher revenue ?   ${JSON.stringify(
      salesData
    )}`;

    let response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let recommendations = response.data.candidates[0].content.parts[0].text;
    res.json({ recommendations });
  } catch (err) {
    res.status(500).json({ error: err.message ? err.message : err });
    console.error("There's an error => ", err.message ? err.message : err);
  }
};

module.exports = {
  getRecommendations,
};
