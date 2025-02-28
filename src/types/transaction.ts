export type TransactionType = "deposit" | "withdrawal" | "credit" | "paypal";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  date: string;
  timestamp: number;
  amount: number;
  formattedAmount: string; // With +/- sign and currency
  category: string;
  iconColor: string;
  status: TransactionStatus;
}

export interface TransactionSummary {
  id: string;
  type: TransactionType;
  description: string;
  date: string;
  amount: number;
  formattedAmount: string;
  iconColor: string;
}