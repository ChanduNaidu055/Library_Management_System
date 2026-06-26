const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

// Route imports
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const memberRoutes = require("./routes/memberRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Main API Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);

app.use(errorHandler);

const initializeDbAndServer = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (e) {
    console.log(`Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();