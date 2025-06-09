import { BalanceHistory } from '../types';

interface AllBalanceHistory {
  daily: BalanceHistory;
  weekly: BalanceHistory;
  monthly: BalanceHistory;
  yearly: BalanceHistory;
}

// Function to generate random fluctuating balance
const generateBalanceHistory = (startBalance: number, numberOfPoints: number, volatility: number): number[] => {
  const balances: number[] = [startBalance];
  
  for (let i = 1; i < numberOfPoints; i++) {
    // Random fluctuation between -volatility% and +volatility%
    const change = startBalance * (Math.random() * volatility * 2 - volatility) / 100;
    const newBalance = Math.max(100, balances[i-1] + change); // Ensure balance doesn't go below 100
    balances.push(Number(newBalance.toFixed(2)));
  }
  
  return balances;
};

export const balanceHistoryData: AllBalanceHistory = {
  daily: {
    labels: ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"],
    values: generateBalanceHistory(2500, 9, 2), // Low volatility for daily
  },
  weekly: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: generateBalanceHistory(2500, 7, 5), // Medium volatility for weekly
  },
  monthly: {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    values: [100, 280, 450, 790, 210, 250, 600],
  },
  yearly: {
    labels: ["2020", "2021", "2022", "2023"],
    values: generateBalanceHistory(1500, 4, 20), // High volatility for yearly
  }
};