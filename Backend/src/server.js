import express from "express";
import dotenv, { parse } from "dotenv";
import { sql } from "../src/config/db.js";
import rateLimiter from "../src/middlewares/rateLimiter.js";
import transactionsRoute from "../src/routes/transactions.route.js";
dotenv.config();

const app = express();

app.set('trust proxy', true);

// middlewares
app.use(rateLimiter);
app.use(express.json());  // Parse JSON bodies



// Load environment variables
const PORT = process.env.PORT || 3000;

// initialize database
async function initDB() {
    try {
        await sql `CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        console.log("Database initialized successfully.");
    } catch (error) {
        console.log(`Error initializing database: ${error.message}`);
        process.exit(1);
    }
}

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
