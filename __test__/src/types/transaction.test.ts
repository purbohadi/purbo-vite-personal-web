import {
    TransactionType,
    TransactionStatus,
    Transaction,
    TransactionSummary,
} from '../../../src/types/transaction';

describe('Transaction Types', () => {
    describe('TransactionType', () => {
        it('should accept valid transaction types', () => {
            const validTypes: TransactionType[] = ['deposit', 'withdrawal', 'credit', 'paypal'];

            validTypes.forEach(type => {
                expect(['deposit', 'withdrawal', 'credit', 'paypal']).toContain(type);
            });
        });

        it('should create transaction type variables', () => {
            const depositType: TransactionType = 'deposit';
            const withdrawalType: TransactionType = 'withdrawal';
            const creditType: TransactionType = 'credit';
            const paypalType: TransactionType = 'paypal';

            expect(depositType).toBe('deposit');
            expect(withdrawalType).toBe('withdrawal');
            expect(creditType).toBe('credit');
            expect(paypalType).toBe('paypal');
        });
    });

    describe('TransactionStatus', () => {
        it('should accept valid transaction statuses', () => {
            const validStatuses: TransactionStatus[] = ['completed', 'pending', 'failed'];

            validStatuses.forEach(status => {
                expect(['completed', 'pending', 'failed']).toContain(status);
            });
        });

        it('should create transaction status variables', () => {
            const completedStatus: TransactionStatus = 'completed';
            const pendingStatus: TransactionStatus = 'pending';
            const failedStatus: TransactionStatus = 'failed';

            expect(completedStatus).toBe('completed');
            expect(pendingStatus).toBe('pending');
            expect(failedStatus).toBe('failed');
        });
    });

    describe('Transaction', () => {
        it('should create a valid Transaction object', () => {
            const transaction: Transaction = {
                id: 'txn-123',
                type: 'deposit',
                description: 'Salary payment',
                date: '2023-12-25',
                timestamp: 1703505600000,
                amount: 5000,
                formattedAmount: '+$5,000.00',
                category: 'Income',
                iconColor: 'green',
                status: 'completed',
            };

            expect(transaction).toMatchObject({
                id: expect.any(String),
                type: expect.any(String),
                description: expect.any(String),
                date: expect.any(String),
                timestamp: expect.any(Number),
                amount: expect.any(Number),
                formattedAmount: expect.any(String),
                category: expect.any(String),
                iconColor: expect.any(String),
                status: expect.any(String),
            });
        });

        it('should handle different transaction types', () => {
            const transactions: Transaction[] = [
                {
                    id: 'txn-1',
                    type: 'deposit',
                    description: 'Bank deposit',
                    date: '2023-12-25',
                    timestamp: 1703505600000,
                    amount: 1000,
                    formattedAmount: '+$1,000.00',
                    category: 'Income',
                    iconColor: 'green',
                    status: 'completed',
                },
                {
                    id: 'txn-2',
                    type: 'withdrawal',
                    description: 'ATM withdrawal',
                    date: '2023-12-24',
                    timestamp: 1703419200000,
                    amount: -200,
                    formattedAmount: '-$200.00',
                    category: 'Cash',
                    iconColor: 'red',
                    status: 'completed',
                },
                {
                    id: 'txn-3',
                    type: 'credit',
                    description: 'Credit card payment',
                    date: '2023-12-23',
                    timestamp: 1703332800000,
                    amount: -300,
                    formattedAmount: '-$300.00',
                    category: 'Bills',
                    iconColor: 'blue',
                    status: 'pending',
                },
                {
                    id: 'txn-4',
                    type: 'paypal',
                    description: 'PayPal transfer',
                    date: '2023-12-22',
                    timestamp: 1703246400000,
                    amount: 150,
                    formattedAmount: '+$150.00',
                    category: 'Transfer',
                    iconColor: 'yellow',
                    status: 'failed',
                },
            ];

            expect(transactions).toHaveLength(4);
            expect(transactions[0].type).toBe('deposit');
            expect(transactions[1].type).toBe('withdrawal');
            expect(transactions[2].type).toBe('credit');
            expect(transactions[3].type).toBe('paypal');
        });

        it('should handle different transaction statuses', () => {
            const transactions: Transaction[] = [
                {
                    id: 'txn-1',
                    type: 'deposit',
                    description: 'Completed transaction',
                    date: '2023-12-25',
                    timestamp: 1703505600000,
                    amount: 1000,
                    formattedAmount: '+$1,000.00',
                    category: 'Income',
                    iconColor: 'green',
                    status: 'completed',
                },
                {
                    id: 'txn-2',
                    type: 'withdrawal',
                    description: 'Pending transaction',
                    date: '2023-12-24',
                    timestamp: 1703419200000,
                    amount: -200,
                    formattedAmount: '-$200.00',
                    category: 'Cash',
                    iconColor: 'orange',
                    status: 'pending',
                },
                {
                    id: 'txn-3',
                    type: 'credit',
                    description: 'Failed transaction',
                    date: '2023-12-23',
                    timestamp: 1703332800000,
                    amount: -300,
                    formattedAmount: '-$300.00',
                    category: 'Bills',
                    iconColor: 'red',
                    status: 'failed',
                },
            ];

            expect(transactions[0].status).toBe('completed');
            expect(transactions[1].status).toBe('pending');
            expect(transactions[2].status).toBe('failed');
        });

        it('should validate positive and negative amounts', () => {
            const positiveTransaction: Transaction = {
                id: 'txn-positive',
                type: 'deposit',
                description: 'Income',
                date: '2023-12-25',
                timestamp: 1703505600000,
                amount: 1000,
                formattedAmount: '+$1,000.00',
                category: 'Income',
                iconColor: 'green',
                status: 'completed',
            };

            const negativeTransaction: Transaction = {
                id: 'txn-negative',
                type: 'withdrawal',
                description: 'Expense',
                date: '2023-12-25',
                timestamp: 1703505600000,
                amount: -500,
                formattedAmount: '-$500.00',
                category: 'Expense',
                iconColor: 'red',
                status: 'completed',
            };

            expect(positiveTransaction.amount).toBeGreaterThan(0);
            expect(negativeTransaction.amount).toBeLessThan(0);
            expect(positiveTransaction.formattedAmount).toMatch(/^\+/);
            expect(negativeTransaction.formattedAmount).toMatch(/^-/);
        });
    });

    describe('TransactionSummary', () => {
        it('should create a valid TransactionSummary object', () => {
            const summary: TransactionSummary = {
                id: 'txn-summary-123',
                type: 'deposit',
                description: 'Monthly salary',
                date: '2023-12-25',
                amount: 5000,
                formattedAmount: '+$5,000.00',
                iconColor: 'green',
            };

            expect(summary).toMatchObject({
                id: expect.any(String),
                type: expect.any(String),
                description: expect.any(String),
                date: expect.any(String),
                amount: expect.any(Number),
                formattedAmount: expect.any(String),
                iconColor: expect.any(String),
            });
        });

        it('should contain subset of Transaction fields', () => {
            const fullTransaction: Transaction = {
                id: 'txn-123',
                type: 'deposit',
                description: 'Salary payment',
                date: '2023-12-25',
                timestamp: 1703505600000,
                amount: 5000,
                formattedAmount: '+$5,000.00',
                category: 'Income',
                iconColor: 'green',
                status: 'completed',
            };

            const summary: TransactionSummary = {
                id: fullTransaction.id,
                type: fullTransaction.type,
                description: fullTransaction.description,
                date: fullTransaction.date,
                amount: fullTransaction.amount,
                formattedAmount: fullTransaction.formattedAmount,
                iconColor: fullTransaction.iconColor,
            };

            expect(summary.id).toBe(fullTransaction.id);
            expect(summary.type).toBe(fullTransaction.type);
            expect(summary.description).toBe(fullTransaction.description);
            expect(summary.date).toBe(fullTransaction.date);
            expect(summary.amount).toBe(fullTransaction.amount);
            expect(summary.formattedAmount).toBe(fullTransaction.formattedAmount);
            expect(summary.iconColor).toBe(fullTransaction.iconColor);
        });

        it('should handle all transaction types in summary', () => {
            const summaries: TransactionSummary[] = [
                {
                    id: 'summary-1',
                    type: 'deposit',
                    description: 'Deposit summary',
                    date: '2023-12-25',
                    amount: 1000,
                    formattedAmount: '+$1,000.00',
                    iconColor: 'green',
                },
                {
                    id: 'summary-2',
                    type: 'withdrawal',
                    description: 'Withdrawal summary',
                    date: '2023-12-24',
                    amount: -200,
                    formattedAmount: '-$200.00',
                    iconColor: 'red',
                },
                {
                    id: 'summary-3',
                    type: 'credit',
                    description: 'Credit summary',
                    date: '2023-12-23',
                    amount: -300,
                    formattedAmount: '-$300.00',
                    iconColor: 'blue',
                },
                {
                    id: 'summary-4',
                    type: 'paypal',
                    description: 'PayPal summary',
                    date: '2023-12-22',
                    amount: 150,
                    formattedAmount: '+$150.00',
                    iconColor: 'yellow',
                },
            ];

            expect(summaries).toHaveLength(4);
            summaries.forEach(summary => {
                expect(['deposit', 'withdrawal', 'credit', 'paypal']).toContain(summary.type);
            });
        });
    });
});

// Type guard utility functions for testing
export const isValidTransactionType = (type: string): type is TransactionType => {
    return ['deposit', 'withdrawal', 'credit', 'paypal'].includes(type as TransactionType);
};

export const isValidTransactionStatus = (status: string): status is TransactionStatus => {
    return ['completed', 'pending', 'failed'].includes(status as TransactionStatus);
};

export const isTransaction = (obj: any): obj is Transaction => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        isValidTransactionType(obj.type) &&
        typeof obj.description === 'string' &&
        typeof obj.date === 'string' &&
        typeof obj.timestamp === 'number' &&
        typeof obj.amount === 'number' &&
        typeof obj.formattedAmount === 'string' &&
        typeof obj.category === 'string' &&
        typeof obj.iconColor === 'string' &&
        isValidTransactionStatus(obj.status)
    );
};

export const isTransactionSummary = (obj: any): obj is TransactionSummary => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        isValidTransactionType(obj.type) &&
        typeof obj.description === 'string' &&
        typeof obj.date === 'string' &&
        typeof obj.amount === 'number' &&
        typeof obj.formattedAmount === 'string' &&
        typeof obj.iconColor === 'string'
    );
};

describe('Transaction Type Guards', () => {
    describe('isValidTransactionType', () => {
        it('should return true for valid transaction types', () => {
            expect(isValidTransactionType('deposit')).toBe(true);
            expect(isValidTransactionType('withdrawal')).toBe(true);
            expect(isValidTransactionType('credit')).toBe(true);
            expect(isValidTransactionType('paypal')).toBe(true);
        });

        it('should return false for invalid transaction types', () => {
            expect(isValidTransactionType('transfer')).toBe(false);
            expect(isValidTransactionType('investment')).toBe(false);
            expect(isValidTransactionType('')).toBe(false);
            expect(isValidTransactionType('123')).toBe(false);
        });
    });

    describe('isValidTransactionStatus', () => {
        it('should return true for valid transaction statuses', () => {
            expect(isValidTransactionStatus('completed')).toBe(true);
            expect(isValidTransactionStatus('pending')).toBe(true);
            expect(isValidTransactionStatus('failed')).toBe(true);
        });

        it('should return false for invalid transaction statuses', () => {
            expect(isValidTransactionStatus('processing')).toBe(false);
            expect(isValidTransactionStatus('cancelled')).toBe(false);
            expect(isValidTransactionStatus('')).toBe(false);
            expect(isValidTransactionStatus('123')).toBe(false);
        });
    });

    describe('isTransaction', () => {
        it('should return true for valid Transaction', () => {
            const transaction = {
                id: 'txn-123',
                type: 'deposit',
                description: 'Test transaction',
                date: '2023-12-25',
                timestamp: 1703505600000,
                amount: 1000,
                formattedAmount: '+$1,000.00',
                category: 'Income',
                iconColor: 'green',
                status: 'completed',
            };

            expect(isTransaction(transaction)).toBe(true);
        });

        it('should return false for invalid Transaction', () => {
            const invalidTransaction = {
                id: 'txn-123',
                type: 'invalid-type',
                description: 'Test transaction',
            };

            expect(isTransaction(invalidTransaction)).toBe(false);
            expect(isTransaction(null)).toBe(false);
            expect(isTransaction(undefined)).toBe(false);
            expect(isTransaction('string')).toBe(false);
        });
    });

    describe('isTransactionSummary', () => {
        it('should return true for valid TransactionSummary', () => {
            const summary = {
                id: 'summary-123',
                type: 'deposit',
                description: 'Test summary',
                date: '2023-12-25',
                amount: 1000,
                formattedAmount: '+$1,000.00',
                iconColor: 'green',
            };

            expect(isTransactionSummary(summary)).toBe(true);
        });

        it('should return false for invalid TransactionSummary', () => {
            const invalidSummary = {
                id: 'summary-123',
                type: 'invalid-type',
                description: 'Test summary',
            };

            expect(isTransactionSummary(invalidSummary)).toBe(false);
        });
    });
});

// Utility functions for testing
export const createMockTransaction = (overrides?: Partial<Transaction>): Transaction => {
    return {
        id: 'mock-txn-123',
        type: 'deposit',
        description: 'Mock transaction',
        date: '2023-12-25',
        timestamp: 1703505600000,
        amount: 1000,
        formattedAmount: '+$1,000.00',
        category: 'Mock',
        iconColor: 'green',
        status: 'completed',
        ...overrides,
    };
};

export const createMockTransactionSummary = (overrides?: Partial<TransactionSummary>): TransactionSummary => {
    return {
        id: 'mock-summary-123',
        type: 'deposit',
        description: 'Mock summary',
        date: '2023-12-25',
        amount: 1000,
        formattedAmount: '+$1,000.00',
        iconColor: 'green',
        ...overrides,
    };
};

describe('Mock Utilities', () => {
    describe('createMockTransaction', () => {
        it('should create a default mock transaction', () => {
            const mockTransaction = createMockTransaction();

            expect(isTransaction(mockTransaction)).toBe(true);
            expect(mockTransaction.id).toBe('mock-txn-123');
            expect(mockTransaction.type).toBe('deposit');
        });

        it('should allow overriding default values', () => {
            const mockTransaction = createMockTransaction({
                type: 'withdrawal',
                amount: -500,
                status: 'pending',
            });

            expect(mockTransaction.type).toBe('withdrawal');
            expect(mockTransaction.amount).toBe(-500);
            expect(mockTransaction.status).toBe('pending');
            expect(mockTransaction.id).toBe('mock-txn-123'); // Should keep default
        });
    });

    describe('createMockTransactionSummary', () => {
        it('should create a default mock transaction summary', () => {
            const mockSummary = createMockTransactionSummary();

            expect(isTransactionSummary(mockSummary)).toBe(true);
            expect(mockSummary.id).toBe('mock-summary-123');
            expect(mockSummary.type).toBe('deposit');
        });

        it('should allow overriding default values', () => {
            const mockSummary = createMockTransactionSummary({
                type: 'paypal',
                amount: 250,
                iconColor: 'blue',
            });

            expect(mockSummary.type).toBe('paypal');
            expect(mockSummary.amount).toBe(250);
            expect(mockSummary.iconColor).toBe('blue');
        });
    });
}); 