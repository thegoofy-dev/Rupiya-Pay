const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const transactionRoutes = require("./routes/transaction.routes");
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Database Connection
const { connectDB } = require("./config/database");

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database connection failed:", err));

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
