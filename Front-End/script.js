// Connect to Socket.IO server
const socket = io("http://localhost:8080");

socket.on("connect", () => {
  console.log("connected to socketIO server with id: ", socket._id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from socket-IO");
});

socket.on("connect-error", (err) => {
  console.log(
    "Error connecting to socket.io: ",
    err.message ? err.message : err
  );
});

// DOM Elements
const orderForm = document.getElementById("order-form");
const totalRevenue = document.getElementById("total-revenue");
const recentRevenue = document.getElementById("recent-revenue");
const recentOrders = document.getElementById("recent-orders");
const topProductsList = document.getElementById("top-products");
const orderList = document.getElementById("order-list");
const recommendationsDiv = document.getElementById("recommendations");
const getRecommendationsBtn = document.getElementById("get-recommendations");

// Array to store recent orders
let recentOrdersList = [];

// Handle form submission to add a new order
orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const productId = document.getElementById("product-id").value;
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").value;

  try {
    const response = await fetch("http://localhost:8080/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: Number(quantity),
        price: Number(price),
      }),
    });

    if (response.ok) {
      alert("Order added successfully!");
      orderForm.reset();
    } else {
      const errorData = await response.json();
      alert(`Failed to add order: ${errorData.error}`);
    }
  } catch (err) {
    console.error("Error adding order:", err);
    alert("Failed to add order. Check the console for details.");
  }
});

// Function to update the UI with analytics data
const updateAnalyticsUI = (data) => {
  totalRevenue.textContent = data.totalRevenue;
  recentRevenue.textContent = data.recentRevenue;
  recentOrders.textContent = data.recentOrderCount;

  // Display top products
  topProductsList.innerHTML = data.topProducts
    .map(
      (product) =>
        `<li>Product ID: ${product._id} - Total Sales: ${product.totalSales}</li>`
    )
    .join("");
};

// Function to update the UI with recent orders
const updateOrderListUI = (orders) => {
  orderList.innerHTML = orders
    .map(
      (order) =>
        `<li>Product ID: ${order.product_id}, Quantity: ${order.quantity}, Price: ${order.price}</li>`
    )
    .join("");
};

// Fetch and display analytics
const fetchAnalytics = async () => {
  try {
    // Show loading state
    totalRevenue.textContent = "Loading...";
    recentRevenue.textContent = "Loading...";
    recentOrders.textContent = "Loading...";
    topProductsList.innerHTML = "<li>Loading...</li>";

    const response = await fetch("http://localhost:8080/analytics");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    updateAnalyticsUI(data); // Update the UI with fetched data
  } catch (err) {
    console.error("Error fetching analytics:", err);
    alert("Failed to fetch analytics. Check the console for details.");
  }
};

// Fetch and display recommendations
getRecommendationsBtn.addEventListener("click", async () => {
  try {
    recommendationsDiv.textContent = "Loading...";
    const response = await fetch("http://localhost:8080/recommendations");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    recommendationsDiv.textContent = data.recommendations;
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    alert("Failed to fetch recommendations. Check the console for details.");
  }
});

// Handle real-time updates from Socket.IO
socket.on("new_order", (data) => {
  recentOrdersList.unshift(data.data); // Add new order to the beginning of the list
  if (recentOrdersList.length > 10) {
    recentOrdersList.pop(); // Keep only the last 10 orders
  }
  updateOrderListUI(recentOrdersList); // Update the UI with recent orders
});

socket.on("analytics_update", (data) => {
  fetchAnalytics(); // Refresh analytics data
});

// Initial fetch of analytics data
fetchAnalytics();
