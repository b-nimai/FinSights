import { sql } from "../config/db.js";

// Create transaction controller
export const createTransaction = async (req, res) => {
    const { user_id, title, amount, category } = req.body;
    if (!user_id || !title || amount === undefined || !category) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    try {
        const result = await sql`
            INSERT INTO transactions (user_id, title, amount, category) 
            VALUES (${user_id}, ${title}, ${amount}, ${category}) RETURNING *
        `;
        res.status(201).json(result[0]);
    } catch (error) {
        console.error(`Error creating transaction: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all transactions for a user controller
export const getTransactionsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
        `;
        res.status(200).json(transactions);
    } catch (error) {
        console.error(`Error fetching transactions: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete transaction controller by id
export const deleteTransactionById = async (req, res) => {
    const { id } = req.params;
    // Validate the ID
    if (isNaN(parseInt(id)) || parseInt(id) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid transaction ID"
        });
    }

    try {
        const result = await sql`
            DELETE FROM transactions WHERE id = ${id} RETURNING *
        `;
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Transaction deleted successfully"
        });
    } catch (error) {
        console.error(`Error deleting transaction: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get summary of transactions for a user
export const getTransactionSummaryByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS balance FROM transactions WHERE user_id = ${userId}
        `
        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS income FROM transactions 
            WHERE user_id = ${userId} AND amount > 0
        `
        const expenseResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS expense FROM transactions
            WHERE user_id = ${userId} AND amount < 0
        `;
        res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expense: expenseResult[0].expense
        });
    } catch (error) {
        console.error(`Error fetching transaction summary: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
