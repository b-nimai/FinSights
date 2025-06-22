import { useCallback, useState } from "react";
import { Alert } from "react-native"; 
import { API_URL } from "../constants/api";

export const useTransactions = (userId) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState({
        income: 0,
        expense: 0,
        balance: 0,
    });

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/${userId}`, {
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error("Failed to fetch transactions");
            const data = await response.json();
            setTransactions(data);
        } catch (err) {
            console.log("Transaction Fetch Error: ", err);
        }
    }, [userId]);

    const fetchSummary = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
            if (!response.ok) throw new Error("Failed to fetch summary");
            const data = await response.json();
            setSummary(data);
        } catch (err) {
            console.log("Summary Fetch Error: ", err);
        }
    }, [userId]);

    const loadData = useCallback(async () => {
        if (!userId) {
            console.warn("User ID is required");
            return;
        }
        setLoading(true);
        try {
            await Promise.all([fetchTransactions(), fetchSummary()]);
        } catch (err) {
            console.log("Load Data Error: ", err);
        } finally {
            setLoading(false);
        }
    }, [fetchTransactions, fetchSummary, userId]);

    const deleteTransaction = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/transactions/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error("Failed to delete transaction");

            await loadData(); // Refresh after deletion
            Alert.alert("Success", "Transaction deleted successfully");
        } catch (err) {
            console.log("Delete Error: ", err);
            Alert.alert("Error", err.message || "Failed to delete transaction");
        } finally {
            setLoading(false);
        }
    };

    return {
        transactions,
        loading,
        summary,
        loadData,
        deleteTransaction,
    };
};
