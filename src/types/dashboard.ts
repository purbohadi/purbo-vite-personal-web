export interface ExpenseCategory {
  id: string;
  name: string;
  percentage: number;
  amount: number;
  color: string;
}

export interface WeeklyActivity {
  labels: string[];
  deposits: number[];
  withdrawals: number[];
}

export interface BalanceHistory {
  labels: string[];
  values: number[];
}

export interface ChartDataset {
  label?: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  fill?: boolean;
  tension?: number;
  borderWidth?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}