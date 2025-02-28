import { ExpenseCategory, WeeklyActivity } from '../types';

export const expenseData: ExpenseCategory[] = [
  { 
    id: "exp-001",
    name: "Entertainment", 
    percentage: 30, 
    amount: 300, 
    color: "#343C6A" 
  },
  { 
    id: "exp-002",
    name: "Bill Expense", 
    percentage: 15, 
    amount: 150, 
    color: "#FC7900" 
  },
  { 
    id: "exp-003",
    name: "Others", 
    percentage: 35, 
    amount: 350, 
    color: "#232323" 
  },
  { 
    id: "exp-004",
    name: "Investment", 
    percentage: 20, 
    amount: 200, 
    color: "#396AFF" 
  },
];

export const weeklyActivityData: WeeklyActivity = {
  labels: ["Sat","Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  deposits: [300, 450, 320, 500, 350, 400, 380],
  withdrawals: [200, 300, 250, 350, 280, 220, 290]
};