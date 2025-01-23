const http = require("http");
const app = require("./app.js");
const connectDB = require("./models/db.js");
const cors = require("cors");
const env = require("dotenv");
const recommendationsRoutes = require("./routes/recommendations.routes.js");
const analyticsRoutes = require("./routes/analytics.routes.js");
const orderRoutes = require("./routes/order.routes.js");
const { initializeSocket } = require('./socket');

const server = http.createServer(app);


//env configration
env.config();

//cors configuration
app.use(cors());

// DB connection
connectDB();

// socket.io setup
const io = initializeSocket(server)

io.on("connection" , (socket) => {
  console.log("a client connected", socket.id);

  socket.on("disconnect", () => {
    console.log("a client disconnected", socket.id)
  })
})





app.use("/recommendations", recommendationsRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/order", orderRoutes);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is connected on port ${PORT}`);
});

