import {
    ExpenseCategory,
    WeeklyActivity,
    BalanceHistory,
    ChartDataset,
    ChartData,
} from '../../../src/types/dashboard';

describe('Dashboard Types', () => {
    describe('ExpenseCategory', () => {
        it('should create a valid ExpenseCategory object', () => {
            const category: ExpenseCategory = {
                id: 'cat-123',
                name: 'Entertainment',
                percentage: 25.5,
                amount: 1200,
                color: '#FF6384',
            };

            expect(category).toMatchObject({
                id: expect.any(String),
                name: expect.any(String),
                percentage: expect.any(Number),
                amount: expect.any(Number),
                color: expect.any(String),
            });
        });

        it('should handle multiple expense categories', () => {
            const categories: ExpenseCategory[] = [
                {
                    id: 'cat-1',
                    name: 'Food',
                    percentage: 30,
                    amount: 1500,
                    color: '#FF6384',
                },
                {
                    id: 'cat-2',
                    name: 'Transportation',
                    percentage: 20,
                    amount: 1000,
                    color: '#36A2EB',
                },
                {
                    id: 'cat-3',
                    name: 'Utilities',
                    percentage: 15,
                    amount: 750,
                    color: '#FFCE56',
                },
            ];

            expect(categories).toHaveLength(3);
            expect(categories.every(cat => typeof cat.percentage === 'number')).toBe(true);
            expect(categories.every(cat => typeof cat.amount === 'number')).toBe(true);
            expect(categories.every(cat => cat.color.startsWith('#'))).toBe(true);
        });

        it('should validate percentage calculations', () => {
            const categories: ExpenseCategory[] = [
                { id: '1', name: 'A', percentage: 50, amount: 500, color: '#FF0000' },
                { id: '2', name: 'B', percentage: 30, amount: 300, color: '#00FF00' },
                { id: '3', name: 'C', percentage: 20, amount: 200, color: '#0000FF' },
            ];

            const totalPercentage = categories.reduce((sum, cat) => sum + cat.percentage, 0);
            expect(totalPercentage).toBe(100);
        });
    });

    describe('WeeklyActivity', () => {
        it('should create a valid WeeklyActivity object', () => {
            const activity: WeeklyActivity = {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                deposits: [100, 200, 150, 300, 250, 400, 350],
                withdrawals: [50, 75, 100, 125, 80, 90, 110],
            };

            expect(activity).toMatchObject({
                labels: expect.any(Array),
                deposits: expect.any(Array),
                withdrawals: expect.any(Array),
            });

            expect(activity.labels).toHaveLength(7);
            expect(activity.deposits).toHaveLength(7);
            expect(activity.withdrawals).toHaveLength(7);
        });

        it('should validate array lengths match', () => {
            const activity: WeeklyActivity = {
                labels: ['Day1', 'Day2', 'Day3'],
                deposits: [100, 200, 300],
                withdrawals: [50, 75, 100],
            };

            expect(activity.labels.length).toBe(activity.deposits.length);
            expect(activity.labels.length).toBe(activity.withdrawals.length);
        });

        it('should handle numeric arrays correctly', () => {
            const activity: WeeklyActivity = {
                labels: ['Mon', 'Tue'],
                deposits: [100.5, 200.75],
                withdrawals: [50.25, 75.50],
            };

            expect(activity.deposits.every(d => typeof d === 'number')).toBe(true);
            expect(activity.withdrawals.every(w => typeof w === 'number')).toBe(true);
        });
    });

    describe('BalanceHistory', () => {
        it('should create a valid BalanceHistory object', () => {
            const history: BalanceHistory = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                values: [1000, 1200, 1100, 1500, 1300, 1600],
            };

            expect(history).toMatchObject({
                labels: expect.any(Array),
                values: expect.any(Array),
            });

            expect(history.labels).toHaveLength(6);
            expect(history.values).toHaveLength(6);
        });

        it('should validate array lengths match', () => {
            const history: BalanceHistory = {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                values: [5000, 6000, 7000, 8000],
            };

            expect(history.labels.length).toBe(history.values.length);
        });

        it('should handle decimal values', () => {
            const history: BalanceHistory = {
                labels: ['Start', 'End'],
                values: [1000.50, 1234.75],
            };

            expect(history.values.every(v => typeof v === 'number')).toBe(true);
            expect(history.values[0]).toBe(1000.50);
            expect(history.values[1]).toBe(1234.75);
        });
    });

    describe('ChartDataset', () => {
        it('should create a valid ChartDataset object with all properties', () => {
            const dataset: ChartDataset = {
                label: 'Sales Data',
                data: [10, 20, 30, 40, 50],
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
                fill: false,
                tension: 0.4,
                borderWidth: 2,
            };

            expect(dataset).toMatchObject({
                label: expect.any(String),
                data: expect.any(Array),
                backgroundColor: expect.any(String),
                borderColor: expect.any(String),
                fill: expect.any(Boolean),
                tension: expect.any(Number),
                borderWidth: expect.any(Number),
            });
        });

        it('should create a minimal ChartDataset object', () => {
            const dataset: ChartDataset = {
                data: [1, 2, 3, 4, 5],
            };

            expect(dataset.data).toEqual([1, 2, 3, 4, 5]);
            expect(dataset.label).toBeUndefined();
            expect(dataset.backgroundColor).toBeUndefined();
        });

        it('should handle array backgroundColor and borderColor', () => {
            const dataset: ChartDataset = {
                data: [10, 20, 30],
                backgroundColor: ['#FF0000', '#00FF00', '#0000FF'],
                borderColor: ['#FF0000', '#00FF00', '#0000FF'],
            };

            expect(Array.isArray(dataset.backgroundColor)).toBe(true);
            expect(Array.isArray(dataset.borderColor)).toBe(true);
            expect(dataset.backgroundColor).toHaveLength(3);
            expect(dataset.borderColor).toHaveLength(3);
        });

        it('should validate numeric data array', () => {
            const dataset: ChartDataset = {
                data: [1.5, 2.7, 3.2, 4.8, 5.1],
            };

            expect(dataset.data.every(d => typeof d === 'number')).toBe(true);
            expect(dataset.data).toHaveLength(5);
        });
    });

    describe('ChartData', () => {
        it('should create a valid ChartData object', () => {
            const chartData: ChartData = {
                labels: ['A', 'B', 'C', 'D'],
                datasets: [
                    {
                        label: 'Dataset 1',
                        data: [10, 20, 30, 40],
                        backgroundColor: '#FF6384',
                    },
                    {
                        label: 'Dataset 2',
                        data: [15, 25, 35, 45],
                        backgroundColor: '#36A2EB',
                    },
                ],
            };

            expect(chartData).toMatchObject({
                labels: expect.any(Array),
                datasets: expect.any(Array),
            });

            expect(chartData.labels).toHaveLength(4);
            expect(chartData.datasets).toHaveLength(2);
        });

        it('should validate datasets structure', () => {
            const chartData: ChartData = {
                labels: ['X', 'Y'],
                datasets: [
                    {
                        data: [1, 2],
                        label: 'Test Dataset',
                    },
                ],
            };

            expect(chartData.datasets[0]).toHaveProperty('data');
            expect(chartData.datasets[0].data).toEqual([1, 2]);
            expect(chartData.datasets[0].label).toBe('Test Dataset');
        });

        it('should handle multiple datasets with different configurations', () => {
            const chartData: ChartData = {
                labels: ['Jan', 'Feb', 'Mar'],
                datasets: [
                    {
                        label: 'Line Chart',
                        data: [100, 200, 300],
                        borderColor: '#FF6384',
                        fill: false,
                        tension: 0.1,
                    },
                    {
                        label: 'Bar Chart',
                        data: [150, 250, 350],
                        backgroundColor: ['#FF0000', '#00FF00', '#0000FF'],
                        borderWidth: 1,
                    },
                ],
            };

            expect(chartData.datasets).toHaveLength(2);
            expect(chartData.datasets[0].fill).toBe(false);
            expect(chartData.datasets[0].tension).toBe(0.1);
            expect(Array.isArray(chartData.datasets[1].backgroundColor)).toBe(true);
        });
    });
});

// Type guard utility functions for testing
export const isExpenseCategory = (obj: unknown): obj is ExpenseCategory => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof (obj as Record<string, unknown>).id === 'string' &&
        typeof (obj as Record<string, unknown>).name === 'string' &&
        typeof (obj as Record<string, unknown>).percentage === 'number' &&
        typeof (obj as Record<string, unknown>).amount === 'number' &&
        typeof (obj as Record<string, unknown>).color === 'string'
    );
};

export const isWeeklyActivity = (obj: unknown): obj is WeeklyActivity => {
    const record = obj as Record<string, unknown>;
    return (
        typeof obj === 'object' &&
        obj !== null &&
        Array.isArray(record.labels) &&
        Array.isArray(record.deposits) &&
        Array.isArray(record.withdrawals) &&
        record.labels.length === record.deposits.length &&
        record.labels.length === record.withdrawals.length &&
        record.deposits.every((d: unknown) => typeof d === 'number') &&
        record.withdrawals.every((w: unknown) => typeof w === 'number')
    );
};

export const isBalanceHistory = (obj: unknown): obj is BalanceHistory => {
    const record = obj as Record<string, unknown>;
    return (
        typeof obj === 'object' &&
        obj !== null &&
        Array.isArray(record.labels) &&
        Array.isArray(record.values) &&
        record.labels.length === record.values.length &&
        record.values.every((v: unknown) => typeof v === 'number')
    );
};

export const isChartDataset = (obj: unknown): obj is ChartDataset => {
    const record = obj as Record<string, unknown>;
    return (
        typeof obj === 'object' &&
        obj !== null &&
        Array.isArray(record.data) &&
        record.data.every((d: unknown) => typeof d === 'number')
    );
};

export const isChartData = (obj: unknown): obj is ChartData => {
    const record = obj as Record<string, unknown>;
    return (
        typeof obj === 'object' &&
        obj !== null &&
        Array.isArray(record.labels) &&
        Array.isArray(record.datasets) &&
        record.datasets.every(isChartDataset)
    );
};

describe('Dashboard Type Guards', () => {
    describe('isExpenseCategory', () => {
        it('should return true for valid ExpenseCategory', () => {
            const category = {
                id: 'cat-123',
                name: 'Food',
                percentage: 30,
                amount: 1500,
                color: '#FF6384',
            };

            expect(isExpenseCategory(category)).toBe(true);
        });

        it('should return false for invalid ExpenseCategory', () => {
            const invalidCategory = {
                id: 'cat-123',
                name: 'Food',
                percentage: '30', // Should be number
                amount: 1500,
                color: '#FF6384',
            };

            expect(isExpenseCategory(invalidCategory)).toBe(false);
            expect(isExpenseCategory(null)).toBe(false);
            expect(isExpenseCategory(undefined)).toBe(false);
        });
    });

    describe('isWeeklyActivity', () => {
        it('should return true for valid WeeklyActivity', () => {
            const activity = {
                labels: ['Mon', 'Tue'],
                deposits: [100, 200],
                withdrawals: [50, 75],
            };

            expect(isWeeklyActivity(activity)).toBe(true);
        });

        it('should return false for invalid WeeklyActivity', () => {
            const invalidActivity = {
                labels: ['Mon', 'Tue'],
                deposits: [100, 200],
                withdrawals: [50], // Different length
            };

            expect(isWeeklyActivity(invalidActivity)).toBe(false);
        });

        it('should return false when deposits contain non-numbers', () => {
            const invalidActivity = {
                labels: ['Mon', 'Tue'],
                deposits: [100, 'invalid'],
                withdrawals: [50, 75],
            };

            expect(isWeeklyActivity(invalidActivity)).toBe(false);
        });
    });

    describe('isBalanceHistory', () => {
        it('should return true for valid BalanceHistory', () => {
            const history = {
                labels: ['Jan', 'Feb'],
                values: [1000, 1200],
            };

            expect(isBalanceHistory(history)).toBe(true);
        });

        it('should return false for invalid BalanceHistory', () => {
            const invalidHistory = {
                labels: ['Jan', 'Feb'],
                values: [1000], // Different length
            };

            expect(isBalanceHistory(invalidHistory)).toBe(false);
        });
    });

    describe('isChartDataset', () => {
        it('should return true for valid ChartDataset', () => {
            const dataset = {
                data: [1, 2, 3],
                label: 'Test',
            };

            expect(isChartDataset(dataset)).toBe(true);
        });

        it('should return false when data contains non-numbers', () => {
            const invalidDataset = {
                data: [1, 'invalid', 3],
                label: 'Test',
            };

            expect(isChartDataset(invalidDataset)).toBe(false);
        });
    });

    describe('isChartData', () => {
        it('should return true for valid ChartData', () => {
            const chartData = {
                labels: ['A', 'B'],
                datasets: [
                    { data: [1, 2] },
                    { data: [3, 4] },
                ],
            };

            expect(isChartData(chartData)).toBe(true);
        });

        it('should return false for invalid ChartData', () => {
            const invalidChartData = {
                labels: ['A', 'B'],
                datasets: [
                    { data: [1, 'invalid'] }, // Invalid dataset
                ],
            };

            expect(isChartData(invalidChartData)).toBe(false);
        });
    });
});

// Mock utility functions
export const createMockExpenseCategory = (overrides?: Partial<ExpenseCategory>): ExpenseCategory => {
    return {
        id: 'mock-cat-123',
        name: 'Mock Category',
        percentage: 25,
        amount: 1000,
        color: '#FF6384',
        ...overrides,
    };
};

export const createMockWeeklyActivity = (overrides?: Partial<WeeklyActivity>): WeeklyActivity => {
    return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        deposits: [100, 200, 150, 300, 250, 400, 350],
        withdrawals: [50, 75, 100, 125, 80, 90, 110],
        ...overrides,
    };
};

export const createMockBalanceHistory = (overrides?: Partial<BalanceHistory>): BalanceHistory => {
    return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [1000, 1200, 1100, 1500, 1300, 1600],
        ...overrides,
    };
};

export const createMockChartDataset = (overrides?: Partial<ChartDataset>): ChartDataset => {
    return {
        label: 'Mock Dataset',
        data: [10, 20, 30, 40, 50],
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        ...overrides,
    };
};

export const createMockChartData = (overrides?: Partial<ChartData>): ChartData => {
    return {
        labels: ['A', 'B', 'C', 'D', 'E'],
        datasets: [
            createMockChartDataset({ label: 'Dataset 1' }),
            createMockChartDataset({ label: 'Dataset 2', data: [15, 25, 35, 45, 55] }),
        ],
        ...overrides,
    };
};

describe('Dashboard Mock Utilities', () => {
    describe('createMockExpenseCategory', () => {
        it('should create a default mock expense category', () => {
            const mockCategory = createMockExpenseCategory();

            expect(isExpenseCategory(mockCategory)).toBe(true);
            expect(mockCategory.id).toBe('mock-cat-123');
            expect(mockCategory.name).toBe('Mock Category');
        });

        it('should allow overriding default values', () => {
            const mockCategory = createMockExpenseCategory({
                name: 'Custom Category',
                percentage: 50,
                color: '#00FF00',
            });

            expect(mockCategory.name).toBe('Custom Category');
            expect(mockCategory.percentage).toBe(50);
            expect(mockCategory.color).toBe('#00FF00');
            expect(mockCategory.id).toBe('mock-cat-123'); // Should keep default
        });
    });

    describe('createMockWeeklyActivity', () => {
        it('should create a default mock weekly activity', () => {
            const mockActivity = createMockWeeklyActivity();

            expect(isWeeklyActivity(mockActivity)).toBe(true);
            expect(mockActivity.labels).toHaveLength(7);
            expect(mockActivity.deposits).toHaveLength(7);
            expect(mockActivity.withdrawals).toHaveLength(7);
        });

        it('should allow overriding default values', () => {
            const mockActivity = createMockWeeklyActivity({
                labels: ['Day 1', 'Day 2'],
                deposits: [500, 600],
                withdrawals: [100, 200],
            });

            expect(mockActivity.labels).toEqual(['Day 1', 'Day 2']);
            expect(mockActivity.deposits).toEqual([500, 600]);
            expect(mockActivity.withdrawals).toEqual([100, 200]);
        });
    });

    describe('createMockBalanceHistory', () => {
        it('should create a default mock balance history', () => {
            const mockHistory = createMockBalanceHistory();

            expect(isBalanceHistory(mockHistory)).toBe(true);
            expect(mockHistory.labels).toHaveLength(6);
            expect(mockHistory.values).toHaveLength(6);
        });

        it('should allow overriding default values', () => {
            const mockHistory = createMockBalanceHistory({
                labels: ['Q1', 'Q2'],
                values: [5000, 6000],
            });

            expect(mockHistory.labels).toEqual(['Q1', 'Q2']);
            expect(mockHistory.values).toEqual([5000, 6000]);
        });
    });

    describe('createMockChartDataset', () => {
        it('should create a default mock chart dataset', () => {
            const mockDataset = createMockChartDataset();

            expect(isChartDataset(mockDataset)).toBe(true);
            expect(mockDataset.label).toBe('Mock Dataset');
            expect(mockDataset.data).toHaveLength(5);
        });

        it('should allow overriding default values', () => {
            const mockDataset = createMockChartDataset({
                label: 'Custom Dataset',
                data: [1, 2, 3],
                fill: true,
            });

            expect(mockDataset.label).toBe('Custom Dataset');
            expect(mockDataset.data).toEqual([1, 2, 3]);
            expect(mockDataset.fill).toBe(true);
        });
    });

    describe('createMockChartData', () => {
        it('should create a default mock chart data', () => {
            const mockChartData = createMockChartData();

            expect(isChartData(mockChartData)).toBe(true);
            expect(mockChartData.labels).toHaveLength(5);
            expect(mockChartData.datasets).toHaveLength(2);
        });

        it('should allow overriding default values', () => {
            const customDataset = createMockChartDataset({ label: 'Custom', data: [1, 2] });
            const mockChartData = createMockChartData({
                labels: ['X', 'Y'],
                datasets: [customDataset],
            });

            expect(mockChartData.labels).toEqual(['X', 'Y']);
            expect(mockChartData.datasets).toHaveLength(1);
            expect(mockChartData.datasets[0].label).toBe('Custom');
        });
    });
}); 