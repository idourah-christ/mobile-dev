import { SET_TRANSACTIONS } from "./constant-type";
import { transactions } from "../../data/transactions";

export const fetchTransactions = () => ({
    type:SET_TRANSACTIONS,
    payload:transactions
})