import { ChartData, ChartDataset } from '../types';

/**
 * Utility functions for Chart.js
 */

// Common chart colors
export const chartColors = {
  blue: '#3B82F6',
  indigo: '#4F46E5',
  green: '#10B981',
  red: '#EF4444',
  yellow: '#F59E0B',
  purple: '#8B5CF6',
  gray: '#6B7280',
  black: '#111111',
  white: '#FFFFFF',
  // Transparent versions
  blueTransparent: 'rgba(59, 130, 246, 0.2)',
  indigoTransparent: 'rgba(79, 70, 229, 0.2)',
  greenTransparent: 'rgba(16, 185, 129, 0.2)',
  redTransparent: 'rgba(239, 68, 68, 0.2)',
  yellowTransparent: 'rgba(245, 158, 11, 0.2)',
};

/**
 * Create a line chart configuration
 */
export const createLineChartData = (
  labels: string[],
  data: number[],
  label: string,
  color: string = chartColors.blue,
  fill: boolean = false
): ChartData => {
  const dataset: ChartDataset = {
    label,
    data,
    borderColor: color,
    backgroundColor: fill ? `${color}20` : undefined, // 20 is hex for 12% opacity
    tension: 0.4,
    borderWidth: 2,
    fill,
  };
  
  return {
    labels,
    datasets: [dataset],
  };
};

/**
 * Create a bar chart configuration
 */
export const createBarChartData = (
  labels: string[],
  datasets: {
    label: string;
    data: number[];
    color: string;
  }[]
): ChartData => {
  return {
    labels,
    datasets: datasets.map(dataset => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.color,
      borderColor: dataset.color,
      borderWidth: 1,
    })),
  };
};

/**
 * Create a pie chart configuration
 */
export const createPieChartData = (
  labels: string[],
  data: number[],
  colors: string[]
): ChartData => {
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };
};

/**
 * Get chart gradient (for certain chart backgrounds)
 */
export const getChartGradient = (ctx: CanvasRenderingContext2D, color: string): CanvasGradient => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, `${color}40`); // 40 is hex for 25% opacity
  gradient.addColorStop(1, `${color}00`); // 00 is hex for 0% opacity
  return gradient;
};