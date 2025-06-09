import { Transaction } from '../types';

export const transactionData: Transaction[] = [
  {
    id: "tx-001",
    type: "withdrawal",
    description: "Deposit From my Card",
    date: "25 January 2023",
    timestamp: 1674633600000, // Jan 25, 2023
    amount: 850,
    formattedAmount: "-$850.00",
    category: "Transfer",
    iconColor: "yellow",
    status: "completed"
  },
  {
    id: "tx-002",
    type: "paypal",
    description: "Deposit Paypal",
    date: "25 January 2023",
    timestamp: 1674619200000, // Jan 25, 2023
    amount: 2500,
    formattedAmount: "+$2500.00",
    category: "Transfer",
    iconColor: "yellow",
    status: "completed"
  },
  {
    id: "tx-003",
    type: "credit",
    description: "Jemi Wilson",
    date: "25 January 2023",
    timestamp: 1674619200000, // Jan 25, 2023
    amount: 5400,
    formattedAmount: "+$5400.00",
    category: "Transfer",
    iconColor: "yellow",
    status: "completed"
  },
  {
    id: "tx-004",
    type: "deposit",
    description: "Arne Sorenson",
    date: "25 January 2023",
    timestamp: 1674619200000, // Jan 25, 2023
    amount: 3500,
    formattedAmount: "+$3500.00",
    category: "Transfer",
    iconColor: "yellow",
    status: "completed"
  },
];