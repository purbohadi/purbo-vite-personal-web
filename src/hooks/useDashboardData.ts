// src/hooks/useDashboardData.ts
import { useState, useEffect, useCallback } from 'react';
import { api } from '../mocks/apiService';
import { useLocalStorage } from './useLocalStorage';
import { Card, Transaction, ExpenseCategory, Contact, BalanceHistory, WeeklyActivity } from '../types';

interface DashboardData {
  cards: Card[];
  transactions: Transaction[];
  expenseCategories: ExpenseCategory[];
  contacts: Contact[];
  balanceHistory: BalanceHistory;
  weeklyActivity: WeeklyActivity;
}

interface UseDashboardDataResult extends DashboardData {
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}

const CACHE_KEY = 'dashboard_data_cache';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

export function useDashboardData(): UseDashboardDataResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Initialize with empty data
  const [data, setData] = useState<DashboardData>({
    cards: [],
    transactions: [],
    expenseCategories: [],
    contacts: [],
    balanceHistory: { labels: [], values: [] },
    weeklyActivity: { labels: [], deposits: [], withdrawals: [] },
  });

  // Check local storage cache (with timestamp)
  const [cachedData, setCachedData] = useLocalStorage<{
    data: DashboardData;
    timestamp: number;
  } | null>(CACHE_KEY, null);

  const fetchData = useCallback(async () => {
    // Avoid fetching if already loading
    if (isLoading) return;

    // Check if we have valid cached data
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRY) {
      setData(cachedData.data);
      setLastUpdated(new Date(cachedData.timestamp));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch all data in parallel
      const [cards, transactions, expenseCategories, contacts, balanceHistory, weeklyActivity] = await Promise.all([
        api.getCards(),
        api.getTransactions(),
        api.getExpenseCategories(),
        api.getFrequentContacts(),
        api.getBalanceHistory(),
        api.getWeeklyActivity()
      ]);

      const newData = { cards, transactions, expenseCategories, contacts, balanceHistory, weeklyActivity };

      // Update state and cache
      setData(newData);
      setCachedData({
        data: newData,
        timestamp: Date.now()
      });
      setLastUpdated(new Date());

    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, cachedData, setCachedData]); // Added isLoading to dependencies

  // Initial data load - run only once when component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to ensure it runs only once

  // Create a stable refetch function that doesn't change on every render
  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return {
    ...data,
    isLoading,
    error,
    refetch,
    lastUpdated
  };
}