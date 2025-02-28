import { create } from 'zustand';

interface Card {
  id: string;
  balance: string;
  cardholderName: string;
  cardNumber: string;
  type: 'visa' | 'mastercard';
  expiry: string;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  description: string;
  date: string;
  amount: number;
  iconColor: string;
}

interface ExpenseCategory {
  name: string;
  percentage: number;
  color: string;
}

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface BalanceHistory {
  labels: string[];
  values: number[];
}

interface DashboardState {
  cards: Card[];
  transactions: Transaction[];
  expenseCategories: ExpenseCategory[];
  contacts: Contact[];
  balanceHistory: BalanceHistory;
}

export const useDashboardStore = create<DashboardState>(() => ({
  cards: [
    {
      id: '1',
      balance: '5,756',
      cardholderName: 'Mike Gormeo',
      cardNumber: '3778 **** **** 1234',
      type: 'visa',
      expiry: '12/22',
    },
    {
      id: '2',
      balance: '5,756',
      cardholderName: 'Mike Gormeo',
      cardNumber: '3778 **** **** 1234',
      type: 'mastercard',
      expiry: '12/22',
    },
  ],
  transactions: [
    {
      id: '1',
      type: 'withdrawal',
      description: 'Deposit From my Card 1',
      date: '25 January 2023',
      amount: 850,
      iconColor: 'yellow',
    },
    {
      id: '2',
      type: 'deposit',
      description: 'Deposit Paypal',
      date: '25 January 2023',
      amount: 920,
      iconColor: 'yellow',
    },
    {
      id: '3',
      type: 'withdrawal',
      description: 'John Wilson',
      date: '21 January 2021',
      amount: 55,
      iconColor: 'blue',
    },
    {
      id: '4',
      type: 'withdrawal',
      description: 'Netflix Subscription',
      date: '18 January 2021',
      amount: 12.99,
      iconColor: 'red',
    },
    {
      id: '5',
      type: 'deposit',
      description: 'Salary Payment',
      date: '15 January 2021',
      amount: 3200,
      iconColor: 'green',
    },
  ],
  expenseCategories: [
    { name: 'Entertainment', percentage: 35, color: '#FF6B6B' },
    { name: 'Bill Expenses', percentage: 15, color: '#FFA947' },
    { name: 'Investment', percentage: 20, color: '#4F46E5' },
    { name: 'Others', percentage: 30, color: '#111111' },
  ],
  contacts: [
    {
      id: '1',
      name: 'Linda Butler',
      role: 'Friend',
      avatar: '/assets/avatar1.jpg',
    },
    {
      id: '2',
      name: 'Randy Press',
      role: 'Friend',
      avatar: '/assets/avatar2.jpg',
    },
    {
      id: '3',
      name: 'Workman',
      role: 'Designer',
      avatar: '/assets/avatar3.jpg',
    },
  ],
  balanceHistory: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [2300, 2000, 2800, 2400, 3200, 2850],
  },
}));