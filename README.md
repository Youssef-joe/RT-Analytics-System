Overview
This project is a Real-Time Sales Analytics System that allows users to manage and analyze sales data in real-time. It includes features such as:

Adding new orders.

Fetching real-time sales analytics.

Generating AI-based product recommendations.

Real-time updates using WebSocket.

Documentation
AI-Assisted Parts
The following parts of the project were assisted by AI:

Recommendations Endpoint:

The GET /recommendations endpoint uses Gemini (or another AI service) to generate product promotion suggestions based on sales data.

Example AI prompt: "Given this sales data, which products should we promote for higher revenue?"

Code Structure and Boilerplate:

Some boilerplate code and API endpoint structures were generated with the assistance of AI tools like ChatGPT.

Manual Implementation Details
The following parts of the project were implemented manually:

Database Queries:

All database queries (e.g., inserting orders, fetching analytics) were written manually using MongoDB without an ORM like Mongoose.

Real-Time Logic:

Real-time updates were implemented using Socket.IO to broadcast new orders and updated analytics to the frontend.

API Integrations:

The integration with the Gemini API for recommendations and the OpenWeather API for weather-based adjustments was implemented manually.

Frontend:

The frontend was built using HTML, CSS, and JavaScript to interact with the backend and display real-time updates.

How to Run and Test the Project
Prerequisites
Node.js: Ensure Node.js is installed on your system.

MongoDB: Ensure MongoDB is installed and running locally or provide a connection string for a remote database.

API Keys:

Gemini API key (for AI recommendations).

OpenWeather API key (for weather-based recommendations).

Setup : 
    1- Clone the repository:
            git clone https://github.com/your-username/real-time-sales-analytics.git
            cd real-time-sales-analytics

    2-Install dependencies: 
            npm install

    3-Create a .env file in the root directory and add the following environment variables:
            MONGODB_URI=mongodb://localhost:27017/sales_analytics
            GEMINI_API_KEY=your_gemini_api_key
            OPENWEATHER_API_KEY=your_openweather_api_key
            PORT=8080

    4- Start the server:
        npm start or npx nodemon server.js

    5- Open the frontend:
            Serve the public/index.html file using a local server (e.g., http-server or live-server).

            Open the frontend in your browser at http://localhost:5500.


    Testing:

        1. Test Cases
            Here’s an example test case for the POST /order endpoint:

            Test Case: Add a New Order

                Endpoint: POST /order

                Request Body:

                    {
                        "product_id": "123",
                        "quantity": 2,
                        "price": 10
                    }


                    Expected Response:

                    {
                    "id": "65f1b2b3e4b0a1b2c3d4e5f6"
                    }



                    Steps:

Send a POST request to http://localhost:8080/order with the above body.

Verify that the response contains an id field.

Check the database to ensure the order was saved correctly.



2. Real-Time Functionality
Test Case: Real-Time Order Updates

Open the frontend in your browser.

Add a new order using the form.

Verify that the order appears in the Real-Time Orders list immediately.

Test Case: Real-Time Analytics Updates

Add a new order using the form.

Verify that the Total Revenue, Recent Revenue, and Recent Orders values update in real-time.



Project Structure :

    project/
    ├── src/
    │   ├── controllers/       # Controllers for handling requests
    │   ├── models/            # Database models (manual MongoDB queries)
    │   ├── routes/            # Express routes
    │   ├── services/          # Business logic (e.g., AI integration, weather API)
    │   ├── utils/             # Utility functions (e.g., WebSocket, API helpers)
    │   ├── app.js             # Express app setup
    │   └── server.js          # Server entry point
    ├── public/                # Frontend files (HTML, CSS, JS)
    ├── tests/                 # Test cases
    ├── README.md              # Documentation
    └── .env                   # Environment variables



    Contributors : Youssef Ali Ahmed

