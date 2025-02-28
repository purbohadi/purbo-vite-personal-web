import { 
    Card, 
    Transaction, 
    ExpenseCategory, 
    Contact, 
    UserProfile,
    BalanceHistory,
    WeeklyActivity,
    CompleteUserData
  } from '../types';
  import { cardData } from './cardData';
  import { transactionData } from './transactionData';
  import { expenseData, weeklyActivityData } from './expenseData';
  import { contactData } from './contactData';
  import { userData } from './userData';
  import { balanceHistoryData } from './balanceHistoryData';
  
  // Add delay to simulate network request
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  export const api = {
    // Cards
    getCards: async (): Promise<Card[]> => {
      await delay(300);
      return [...cardData];
    },
    
    getCardById: async (id: string): Promise<Card | undefined> => {
      await delay(200);
      return cardData.find(card => card.id === id);
    },
    
    // Transactions
    getTransactions: async (limit?: number): Promise<Transaction[]> => {
      await delay(400);
      const sortedTransactions = [...transactionData].sort((a, b) => b.timestamp - a.timestamp);
      return limit ? sortedTransactions.slice(0, limit) : sortedTransactions;
    },
    
    getTransactionById: async (id: string): Promise<Transaction | undefined> => {
      await delay(200);
      return transactionData.find(tx => tx.id === id);
    },
    
    // Expenses
    getExpenseCategories: async (): Promise<ExpenseCategory[]> => {
      await delay(300);
      return [...expenseData];
    },
    
    getWeeklyActivity: async (): Promise<WeeklyActivity> => {
      await delay(350);
      return { ...weeklyActivityData };
    },
    
    // Contacts
    getFrequentContacts: async (limit: number = 4): Promise<Contact[]> => {
      await delay(250);
      return [...contactData]
        .sort((a, b) => b.frequency - a.frequency);
    },
    
    getAllContacts: async (): Promise<Contact[]> => {
      await delay(300);
      return [...contactData];
    },
    
    getContactById: async (id: string): Promise<Contact | undefined> => {
      await delay(200);
      return contactData.find(contact => contact.id === id);
    },
    
    // User profile
    getUserProfile: async (): Promise<CompleteUserData> => {
      await delay(350);
      return { ...userData };
    },
    
    updateUserProfile: async (updates: Partial<CompleteUserData>): Promise<CompleteUserData> => {
      await delay(500);
      // In a real app, this would update the backend
      // For now, we'll just return the mock data with updates
      return {
        profile: { ...userData.profile, ...(updates.profile || {}) },
        preferences: { ...userData.preferences, ...(updates.preferences || {}) },
        security: { ...userData.security, ...(updates.security || {}) }
      };
    },
    
    // Balance history
    getBalanceHistory: async (timeframe: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly'): Promise<BalanceHistory> => {
      await delay(300);
      return balanceHistoryData[timeframe];
    },
  
    // Simulated transfer
    makeTransfer: async (contactId: string, amount: number): Promise<{success: boolean}> => {
      await delay(800);
      // Simulate successful transfer (would include validation in a real app)
      return { success: true };
    }
  };