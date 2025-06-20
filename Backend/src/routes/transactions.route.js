import express from "express";
import { 
    createTransaction, 
    deleteTransactionById, 
    getTransactionsByUserId, 
    getTransactionSummaryByUserId
} from "../controllers/transactions.controller.js";

const router = express.Router();

// Create a new transaction
router.post("/", createTransaction);

// Get all transactions for a user
router.get("/:userId", getTransactionsByUserId);

// Delete a transaction
router.delete("/:id", deleteTransactionById);

// Get summery of transactions for a user
router.get("/summary/:userId", getTransactionSummaryByUserId);


export default router;