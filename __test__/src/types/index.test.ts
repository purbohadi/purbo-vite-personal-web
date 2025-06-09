import * as cardTypes from '../../../src/types/card';
import * as transactionTypes from '../../../src/types/transaction';
import * as userTypes from '../../../src/types/user';
import * as dashboardTypes from '../../../src/types/dashboard';
import * as allTypes from '../../../src/types/index';

describe('Types Index Exports', () => {
    describe('Card Types Export', () => {
        it('should re-export all card types', () => {
            // Test that card types are accessible through index
            const cardInstance: allTypes.Card = {
                id: 'test-card',
                cardNumber: '1234567890123456',
                cardholderName: 'Test User',
                balance: 1000,
                formattedBalance: '$1,000.00',
                type: 'visa',
                expiry: '12/26',
                cvv: '123',
                isActive: true,
            };

            expect(cardInstance).toBeDefined();
            expect(cardInstance.type).toBe('visa');
        });
    });

    describe('Transaction Types Export', () => {
        it('should re-export all transaction types', () => {
            // Test that transaction types are accessible through index
            const transactionInstance: allTypes.Transaction = {
                id: 'test-txn',
                type: 'deposit',
                description: 'Test transaction',
                date: '2023-12-25',
                timestamp: 1703505600000,
                amount: 1000,
                formattedAmount: '+$1,000.00',
                category: 'Test',
                iconColor: 'green',
                status: 'completed',
            };

            expect(transactionInstance).toBeDefined();
            expect(transactionInstance.type).toBe('deposit');
        });

        it('should allow using transaction type unions', () => {
            const depositType: allTypes.TransactionType = 'deposit';
            const withdrawalType: allTypes.TransactionType = 'withdrawal';
            const creditType: allTypes.TransactionType = 'credit';
            const paypalType: allTypes.TransactionType = 'paypal';

            expect(depositType).toBe('deposit');
            expect(withdrawalType).toBe('withdrawal');
            expect(creditType).toBe('credit');
            expect(paypalType).toBe('paypal');
        });

        it('should allow using transaction status unions', () => {
            const completedStatus: allTypes.TransactionStatus = 'completed';
            const pendingStatus: allTypes.TransactionStatus = 'pending';
            const failedStatus: allTypes.TransactionStatus = 'failed';

            expect(completedStatus).toBe('completed');
            expect(pendingStatus).toBe('pending');
            expect(failedStatus).toBe('failed');
        });
    });

    describe('User Types Export', () => {
        it('should re-export all user types', () => {
            // Test that user types are accessible through index
            const userProfileInstance: allTypes.UserProfile = {
                id: 'test-user',
                name: 'Test User',
                username: 'testuser',
                email: 'test@example.com',
                dob: '1990-01-01',
                presentAddress: '123 Test St',
                permanentAddress: '123 Test St',
                city: 'Test City',
                postalCode: '12345',
                country: 'Test Country',
                profileImage: 'https://example.com/avatar.jpg',
                joinDate: '2023-01-01',
            };

            expect(userProfileInstance).toBeDefined();
            expect(userProfileInstance.name).toBe('Test User');
        });

        it('should allow creating complete user data', () => {
            const completeUserData: allTypes.CompleteUserData = {
                profile: {
                    id: 'test-user',
                    name: 'Test User',
                    username: 'testuser',
                    email: 'test@example.com',
                    dob: '1990-01-01',
                    presentAddress: '123 Test St',
                    permanentAddress: '123 Test St',
                    city: 'Test City',
                    postalCode: '12345',
                    country: 'Test Country',
                    profileImage: 'https://example.com/avatar.jpg',
                    joinDate: '2023-01-01',
                },
                preferences: {
                    notifications: {
                        email: true,
                        push: false,
                        sms: true,
                        newsletter: false,
                    },
                    language: 'en',
                    timezone: 'UTC',
                    currency: 'USD',
                },
                security: {
                    twoFactorEnabled: true,
                    lastPasswordChange: '2023-12-01T00:00:00Z',
                    activeSessions: [],
                },
            };

            expect(completeUserData).toBeDefined();
            expect(completeUserData.profile.name).toBe('Test User');
            expect(completeUserData.preferences.language).toBe('en');
            expect(completeUserData.security.twoFactorEnabled).toBe(true);
        });
    });

    describe('Dashboard Types Export', () => {
        it('should re-export all dashboard types', () => {
            // Test that dashboard types are accessible through index
            const expenseCategoryInstance: allTypes.ExpenseCategory = {
                id: 'test-category',
                name: 'Test Category',
                percentage: 25,
                amount: 1000,
                color: '#FF6384',
            };

            expect(expenseCategoryInstance).toBeDefined();
            expect(expenseCategoryInstance.name).toBe('Test Category');
        });

        it('should allow creating chart data structures', () => {
            const chartData: allTypes.ChartData = {
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                        label: 'Test Dataset',
                        data: [10, 20, 30],
                        backgroundColor: '#FF6384',
                        borderColor: '#FF6384',
                        fill: false,
                    },
                ],
            };

            expect(chartData).toBeDefined();
            expect(chartData.labels).toHaveLength(3);
            expect(chartData.datasets).toHaveLength(1);
            expect(chartData.datasets[0].label).toBe('Test Dataset');
        });
    });

    describe('Module Structure Validation', () => {
        it('should have consistent export structure', () => {
            // Verify that index exports match individual module exports
            const indexExportKeys = Object.keys(allTypes);
            const cardKeys = Object.keys(cardTypes);
            const transactionKeys = Object.keys(transactionTypes);
            const userKeys = Object.keys(userTypes);
            const dashboardKeys = Object.keys(dashboardTypes);

            const expectedKeys = [
                ...cardKeys,
                ...transactionKeys,
                ...userKeys,
                ...dashboardKeys,
            ];

            // All individual module exports should be available in index
            expectedKeys.forEach(key => {
                expect(indexExportKeys).toContain(key);
            });
        });

        it('should not have duplicate exports', () => {
            const indexExportKeys = Object.keys(allTypes);
            const uniqueKeys = [...new Set(indexExportKeys)];

            expect(indexExportKeys.length).toBe(uniqueKeys.length);
        });

        it('should maintain TypeScript compilation', () => {
            // This test ensures that all types can be used together without conflicts
            interface TestInterface {
                card: allTypes.Card;
                transaction: allTypes.Transaction;
                user: allTypes.UserProfile;
                expense: allTypes.ExpenseCategory;
            }

            const testObject: TestInterface = {
                card: {
                    id: 'card-test',
                    cardNumber: '1234567890123456',
                    cardholderName: 'Test User',
                    balance: 1000,
                    formattedBalance: '$1,000.00',
                    type: 'visa',
                    expiry: '12/26',
                    cvv: '123',
                    isActive: true,
                },
                transaction: {
                    id: 'txn-test',
                    type: 'deposit',
                    description: 'Test transaction',
                    date: '2023-12-25',
                    timestamp: 1703505600000,
                    amount: 1000,
                    formattedAmount: '+$1,000.00',
                    category: 'Test',
                    iconColor: 'green',
                    status: 'completed',
                },
                user: {
                    id: 'user-test',
                    name: 'Test User',
                    username: 'testuser',
                    email: 'test@example.com',
                    dob: '1990-01-01',
                    presentAddress: '123 Test St',
                    permanentAddress: '123 Test St',
                    city: 'Test City',
                    postalCode: '12345',
                    country: 'Test Country',
                    profileImage: 'https://example.com/avatar.jpg',
                    joinDate: '2023-01-01',
                },
                expense: {
                    id: 'expense-test',
                    name: 'Test Expense',
                    percentage: 25,
                    amount: 1000,
                    color: '#FF6384',
                },
            };

            expect(testObject).toBeDefined();
            expect(testObject.card.type).toBe('visa');
            expect(testObject.transaction.type).toBe('deposit');
            expect(testObject.user.name).toBe('Test User');
            expect(testObject.expense.name).toBe('Test Expense');
        });
    });

    describe('Type Safety Validation', () => {
        it('should enforce transaction type constraints', () => {
            // This test validates that type unions work correctly
            const validTransactionTypes: allTypes.TransactionType[] = [
                'deposit',
                'withdrawal',
                'credit',
                'paypal',
            ];

            validTransactionTypes.forEach(type => {
                const transaction: allTypes.Transaction = {
                    id: `txn-${type}`,
                    type,
                    description: `Test ${type}`,
                    date: '2023-12-25',
                    timestamp: 1703505600000,
                    amount: 1000,
                    formattedAmount: '+$1,000.00',
                    category: 'Test',
                    iconColor: 'green',
                    status: 'completed',
                };

                expect(transaction.type).toBe(type);
            });
        });

        it('should enforce card type constraints', () => {
            const validCardTypes: ('visa' | 'mastercard')[] = ['visa', 'mastercard'];

            validCardTypes.forEach(type => {
                const card: allTypes.Card = {
                    id: `card-${type}`,
                    cardNumber: '1234567890123456',
                    cardholderName: 'Test User',
                    balance: 1000,
                    formattedBalance: '$1,000.00',
                    type,
                    expiry: '12/26',
                    cvv: '123',
                    isActive: true,
                };

                expect(card.type).toBe(type);
            });
        });

        it('should enforce transaction status constraints', () => {
            const validStatuses: allTypes.TransactionStatus[] = [
                'completed',
                'pending',
                'failed',
            ];

            validStatuses.forEach(status => {
                const transaction: allTypes.Transaction = {
                    id: `txn-${status}`,
                    type: 'deposit',
                    description: `Test ${status}`,
                    date: '2023-12-25',
                    timestamp: 1703505600000,
                    amount: 1000,
                    formattedAmount: '+$1,000.00',
                    category: 'Test',
                    iconColor: 'green',
                    status,
                };

                expect(transaction.status).toBe(status);
            });
        });
    });

    describe('Integration Test', () => {
        it('should allow creating a complete application state type', () => {
            interface ApplicationState {
                user: allTypes.CompleteUserData;
                cards: allTypes.Card[];
                transactions: allTypes.Transaction[];
                dashboard: {
                    expenses: allTypes.ExpenseCategory[];
                    weeklyActivity: allTypes.WeeklyActivity;
                    balanceHistory: allTypes.BalanceHistory;
                };
            }

            const appState: ApplicationState = {
                user: {
                    profile: {
                        id: 'user-1',
                        name: 'App User',
                        username: 'appuser',
                        email: 'app@example.com',
                        dob: '1990-01-01',
                        presentAddress: '123 App St',
                        permanentAddress: '123 App St',
                        city: 'App City',
                        postalCode: '12345',
                        country: 'App Country',
                        profileImage: 'https://example.com/avatar.jpg',
                        joinDate: '2023-01-01',
                    },
                    preferences: {
                        notifications: {
                            email: true,
                            push: false,
                            sms: true,
                            newsletter: false,
                        },
                        language: 'en',
                        timezone: 'UTC',
                        currency: 'USD',
                    },
                    security: {
                        twoFactorEnabled: true,
                        lastPasswordChange: '2023-12-01T00:00:00Z',
                        activeSessions: [],
                    },
                },
                cards: [
                    {
                        id: 'card-1',
                        cardNumber: '1234567890123456',
                        cardholderName: 'App User',
                        balance: 5000,
                        formattedBalance: '$5,000.00',
                        type: 'visa',
                        expiry: '12/26',
                        cvv: '123',
                        isActive: true,
                    },
                ],
                transactions: [
                    {
                        id: 'txn-1',
                        type: 'deposit',
                        description: 'Salary',
                        date: '2023-12-25',
                        timestamp: 1703505600000,
                        amount: 5000,
                        formattedAmount: '+$5,000.00',
                        category: 'Income',
                        iconColor: 'green',
                        status: 'completed',
                    },
                ],
                dashboard: {
                    expenses: [
                        {
                            id: 'exp-1',
                            name: 'Food',
                            percentage: 30,
                            amount: 1500,
                            color: '#FF6384',
                        },
                    ],
                    weeklyActivity: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        deposits: [100, 200, 150, 300, 250, 400, 350],
                        withdrawals: [50, 75, 100, 125, 80, 90, 110],
                    },
                    balanceHistory: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        values: [1000, 1200, 1100, 1500, 1300, 1600],
                    },
                },
            };

            expect(appState).toBeDefined();
            expect(appState.user.profile.name).toBe('App User');
            expect(appState.cards).toHaveLength(1);
            expect(appState.transactions).toHaveLength(1);
            expect(appState.dashboard.expenses).toHaveLength(1);
        });
    });
}); 