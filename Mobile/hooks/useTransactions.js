// import { useCallback, useState } from "react";
// import { Alert } from "react-native"; 


// const API_URL = "https://localhost:3000/api";

// export const useTransactions = (userId) => {
//     const [transactions, setTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [summary, setSummary] = useState({
//         income: 0,
//         expense: 0,
//         balance: 0,
//     });

//     // useCallback to fetch transactions
//     const fetchTransactions = useCallback(async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch(`${API_URL}/transactions/${userId}`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             if (!response.ok) {
//                 throw new Error("Failed to fetch transactions");
//             }
//             const data = await response.json();
//             setTransactions(data);
//         } catch (err) {
//             console.log("Error: ", err);
//         } finally {
//             setLoading(false);
//         }
//     }, [userId]);

//     // useCallback to fetch summary
//     const fetchSummary = useCallback(async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
//             if (!response.ok) {
//                 throw new Error("Failed to fetch summary");
//             }
//             const data = await response.json();
//             setSummary(data);
//         } catch (err) {
//             console.log("Error: ", err);
//         } finally {
//             setLoading(false);
//         }
//     }, [userId]);

//     const loadData = useCallback(async () => {
//         if(!userId) {
//             setError("User ID is required");
//             return;
//         }
//         setLoading(true);
//         try {
//             // Fetch both transactions and summary concurrently
//             await Promise.all([fetchTransactions(), fetchSummary()]);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }, [fetchTransactions, fetchSummary, userId]);


//     const deleteTransaction = async (id) => {
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch(`${API_URL}/transactions/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             if (!response.ok) {
//                 throw new Error("Failed to delete transaction");
//             }
//             // Refresh data after deletion
//             await loadData();
//             Alert.alert("Success", "Transaction deleted successfully");
//         } catch (err) {
//             console.log("Error: ", err);
//             Alert.alert("Error", err.message || "Failed to delete transaction");
//         } finally {
//             setLoading(false);
//         }
//     };
//     return {
//         transactions,
//         loading,
//         error,
//         summary,
//         loadData,
//         deleteTransaction,
//     };

// };


import { useCallback, useState } from "react";
import { Alert } from "react-native"; // If using React Native

const API_URL = "http://10.0.2.2:3000/api";

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
