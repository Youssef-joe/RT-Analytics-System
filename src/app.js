const express = require("express");
const app = express()
const ConnectDB = require("./models/db.js");
const orderRoutes = require("./routes/order.routes.js");
const analyticsRoutes = require("./routes/analytics.routes.js");
const recommendationsRoutes = require("./routes/recommendations.routes.js")

app.use(express.json());


// DB Connection
ConnectDB




module.exports = app;


