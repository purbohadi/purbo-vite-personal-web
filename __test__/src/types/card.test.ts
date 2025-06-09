import { Card, CardSummary } from '../../../src/types/card';

describe('Card Types', () => {
    describe('Card', () => {
        it('should create a valid Card object', () => {
            const card: Card = {
                id: 'card-123',
                cardNumber: '1234567890123456',
                cardholderName: 'John Doe',
                balance: 2500.75,
                formattedBalance: '$2,500.75',
                type: 'visa',
                expiry: '12/26',
                cvv: '123',
                isActive: true,
            };

            expect(card).toMatchObject({
                id: expect.any(String),
                cardNumber: expect.any(String),
                cardholderName: expect.any(String),
                balance: expect.any(Number),
                formattedBalance: expect.any(String),
                type: expect.any(String),
                expiry: expect.any(String),
                cvv: expect.any(String),
                isActive: expect.any(Boolean),
            });
        });

        it('should handle both card types', () => {
            const visaCard: Card = {
                id: 'visa-123',
                cardNumber: '4111111111111111',
                cardholderName: 'Alice Smith',
                balance: 1000,
                formattedBalance: '$1,000.00',
                type: 'visa',
                expiry: '12/25',
                cvv: '123',
                isActive: true,
            };

            const mastercardCard: Card = {
                id: 'mc-123',
                cardNumber: '5555555555554444',
                cardholderName: 'Bob Johnson',
                balance: 1500,
                formattedBalance: '$1,500.00',
                type: 'mastercard',
                expiry: '06/27',
                cvv: '456',
                isActive: false,
            };

            expect(visaCard.type).toBe('visa');
            expect(mastercardCard.type).toBe('mastercard');
            expect(['visa', 'mastercard']).toContain(visaCard.type);
            expect(['visa', 'mastercard']).toContain(mastercardCard.type);
        });

        it('should handle active and inactive cards', () => {
            const activeCard: Card = {
                id: 'active-card',
                cardNumber: '1111222233334444',
                cardholderName: 'Active User',
                balance: 5000,
                formattedBalance: '$5,000.00',
                type: 'visa',
                expiry: '12/28',
                cvv: '789',
                isActive: true,
            };

            const inactiveCard: Card = {
                id: 'inactive-card',
                cardNumber: '4444333322221111',
                cardholderName: 'Inactive User',
                balance: 0,
                formattedBalance: '$0.00',
                type: 'mastercard',
                expiry: '01/24',
                cvv: '456',
                isActive: false,
            };

            expect(activeCard.isActive).toBe(true);
            expect(inactiveCard.isActive).toBe(false);
        });

        it('should validate balance types and formatting', () => {
            const cardWithDecimals: Card = {
                id: 'decimal-card',
                cardNumber: '1234567890123456',
                cardholderName: 'Decimal User',
                balance: 1234.56,
                formattedBalance: '$1,234.56',
                type: 'visa',
                expiry: '12/26',
                cvv: '123',
                isActive: true,
            };

            const cardWithZeroBalance: Card = {
                id: 'zero-card',
                cardNumber: '6543210987654321',
                cardholderName: 'Zero User',
                balance: 0,
                formattedBalance: '$0.00',
                type: 'mastercard',
                expiry: '06/25',
                cvv: '789',
                isActive: true,
            };

            expect(typeof cardWithDecimals.balance).toBe('number');
            expect(cardWithDecimals.balance).toBe(1234.56);
            expect(cardWithZeroBalance.balance).toBe(0);
            expect(cardWithDecimals.formattedBalance).toMatch(/^\$/);
            expect(cardWithZeroBalance.formattedBalance).toMatch(/^\$/);
        });

        it('should handle different expiry date formats', () => {
            const card1: Card = {
                id: 'card-1',
                cardNumber: '1111111111111111',
                cardholderName: 'User One',
                balance: 1000,
                formattedBalance: '$1,000.00',
                type: 'visa',
                expiry: '01/25',
                cvv: '123',
                isActive: true,
            };

            const card2: Card = {
                id: 'card-2',
                cardNumber: '2222222222222222',
                cardholderName: 'User Two',
                balance: 2000,
                formattedBalance: '$2,000.00',
                type: 'mastercard',
                expiry: '12/30',
                cvv: '456',
                isActive: true,
            };

            expect(card1.expiry).toMatch(/^\d{2}\/\d{2}$/);
            expect(card2.expiry).toMatch(/^\d{2}\/\d{2}$/);
        });
    });

    describe('CardSummary', () => {
        it('should create a valid CardSummary object', () => {
            const summary: CardSummary = {
                id: 'summary-123',
                cardNumber: '**** **** **** 1234',
                cardholderName: 'John Doe',
                balance: 2500.75,
                formattedBalance: '$2,500.75',
                type: 'visa',
                expiry: '12/26',
            };

            expect(summary).toMatchObject({
                id: expect.any(String),
                cardNumber: expect.any(String),
                cardholderName: expect.any(String),
                balance: expect.any(Number),
                formattedBalance: expect.any(String),
                type: expect.any(String),
                expiry: expect.any(String),
            });
        });

        it('should contain subset of Card fields', () => {
            const fullCard: Card = {
                id: 'card-123',
                cardNumber: '1234567890123456',
                cardholderName: 'John Doe',
                balance: 2500.75,
                formattedBalance: '$2,500.75',
                type: 'visa',
                expiry: '12/26',
                cvv: '123',
                isActive: true,
            };

            const summary: CardSummary = {
                id: fullCard.id,
                cardNumber: '**** **** **** ' + fullCard.cardNumber.slice(-4),
                cardholderName: fullCard.cardholderName,
                balance: fullCard.balance,
                formattedBalance: fullCard.formattedBalance,
                type: fullCard.type,
                expiry: fullCard.expiry,
            };

            expect(summary.id).toBe(fullCard.id);
            expect(summary.cardholderName).toBe(fullCard.cardholderName);
            expect(summary.balance).toBe(fullCard.balance);
            expect(summary.formattedBalance).toBe(fullCard.formattedBalance);
            expect(summary.type).toBe(fullCard.type);
            expect(summary.expiry).toBe(fullCard.expiry);
            expect(summary.cardNumber).toContain('****');
            expect(summary.cardNumber).toContain('3456');
        });

        it('should handle masked card numbers', () => {
            const summaries: CardSummary[] = [
                {
                    id: 'summary-1',
                    cardNumber: '**** **** **** 1234',
                    cardholderName: 'User One',
                    balance: 1000,
                    formattedBalance: '$1,000.00',
                    type: 'visa',
                    expiry: '12/25',
                },
                {
                    id: 'summary-2',
                    cardNumber: '**** **** **** 5678',
                    cardholderName: 'User Two',
                    balance: 2000,
                    formattedBalance: '$2,000.00',
                    type: 'mastercard',
                    expiry: '06/27',
                },
            ];

            summaries.forEach(summary => {
                expect(summary.cardNumber).toMatch(/^\*{4} \*{4} \*{4} \d{4}$/);
                expect(summary.cardNumber.split(' ')[3]).toHaveLength(4);
                expect(/^\d{4}$/.test(summary.cardNumber.split(' ')[3])).toBe(true);
            });
        });

        it('should handle both card types in summaries', () => {
            const visaSummary: CardSummary = {
                id: 'visa-summary',
                cardNumber: '**** **** **** 1111',
                cardholderName: 'Visa User',
                balance: 1500,
                formattedBalance: '$1,500.00',
                type: 'visa',
                expiry: '03/26',
            };

            const mastercardSummary: CardSummary = {
                id: 'mc-summary',
                cardNumber: '**** **** **** 4444',
                cardholderName: 'MC User',
                balance: 2500,
                formattedBalance: '$2,500.00',
                type: 'mastercard',
                expiry: '09/27',
            };

            expect(visaSummary.type).toBe('visa');
            expect(mastercardSummary.type).toBe('mastercard');
            expect(['visa', 'mastercard']).toContain(visaSummary.type);
            expect(['visa', 'mastercard']).toContain(mastercardSummary.type);
        });
    });
});

// Type guard utility functions for testing
export const isValidCardType = (type: string): type is 'visa' | 'mastercard' => {
    return ['visa', 'mastercard'].includes(type as 'visa' | 'mastercard');
};

export const isCard = (obj: any): obj is Card => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        typeof obj.cardNumber === 'string' &&
        typeof obj.cardholderName === 'string' &&
        typeof obj.balance === 'number' &&
        typeof obj.formattedBalance === 'string' &&
        isValidCardType(obj.type) &&
        typeof obj.expiry === 'string' &&
        typeof obj.cvv === 'string' &&
        typeof obj.isActive === 'boolean'
    );
};

export const isCardSummary = (obj: any): obj is CardSummary => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        typeof obj.cardNumber === 'string' &&
        typeof obj.cardholderName === 'string' &&
        typeof obj.balance === 'number' &&
        typeof obj.formattedBalance === 'string' &&
        isValidCardType(obj.type) &&
        typeof obj.expiry === 'string'
    );
};

describe('Card Type Guards', () => {
    describe('isValidCardType', () => {
        it('should return true for valid card types', () => {
            expect(isValidCardType('visa')).toBe(true);
            expect(isValidCardType('mastercard')).toBe(true);
        });

        it('should return false for invalid card types', () => {
            expect(isValidCardType('amex')).toBe(false);
            expect(isValidCardType('discover')).toBe(false);
            expect(isValidCardType('')).toBe(false);
            expect(isValidCardType('123')).toBe(false);
        });
    });

    describe('isCard', () => {
        it('should return true for valid Card', () => {
            const card = {
                id: 'card-123',
                cardNumber: '1234567890123456',
                cardholderName: 'John Doe',
                balance: 2500.75,
                formattedBalance: '$2,500.75',
                type: 'visa',
                expiry: '12/26',
                cvv: '123',
                isActive: true,
            };

            expect(isCard(card)).toBe(true);
        });

        it('should return false for invalid Card', () => {
            const invalidCard = {
                id: 'card-123',
                cardNumber: '1234567890123456',
                cardholderName: 'John Doe',
                balance: '2500.75', // Should be number
                formattedBalance: '$2,500.75',
                type: 'visa',
                expiry: '12/26',
                cvv: '123',
                isActive: true,
            };

            expect(isCard(invalidCard)).toBe(false);
            expect(isCard(null)).toBe(false);
            expect(isCard(undefined)).toBe(false);
            expect(isCard('string')).toBe(false);
        });

        it('should return false for invalid card type', () => {
            const invalidTypeCard = {
                id: 'card-123',
                cardNumber: '1234567890123456',
                cardholderName: 'John Doe',
                balance: 2500.75,
                formattedBalance: '$2,500.75',
                type: 'amex', // Invalid type
                expiry: '12/26',
                cvv: '123',
                isActive: true,
            };

            expect(isCard(invalidTypeCard)).toBe(false);
        });
    });

    describe('isCardSummary', () => {
        it('should return true for valid CardSummary', () => {
            const summary = {
                id: 'summary-123',
                cardNumber: '**** **** **** 1234',
                cardholderName: 'John Doe',
                balance: 2500.75,
                formattedBalance: '$2,500.75',
                type: 'visa',
                expiry: '12/26',
            };

            expect(isCardSummary(summary)).toBe(true);
        });

        it('should return false for invalid CardSummary', () => {
            const invalidSummary = {
                id: 'summary-123',
                cardNumber: '**** **** **** 1234',
                cardholderName: 'John Doe',
                balance: 2500.75,
                formattedBalance: '$2,500.75',
                type: 'amex', // Invalid type
                expiry: '12/26',
            };

            expect(isCardSummary(invalidSummary)).toBe(false);
        });
    });
});

// Utility functions for testing
export const createMockCard = (overrides?: Partial<Card>): Card => {
    return {
        id: 'mock-card-123',
        cardNumber: '1234567890123456',
        cardholderName: 'Mock User',
        balance: 1000,
        formattedBalance: '$1,000.00',
        type: 'visa',
        expiry: '12/26',
        cvv: '123',
        isActive: true,
        ...overrides,
    };
};

export const createMockCardSummary = (overrides?: Partial<CardSummary>): CardSummary => {
    return {
        id: 'mock-summary-123',
        cardNumber: '**** **** **** 1234',
        cardholderName: 'Mock User',
        balance: 1000,
        formattedBalance: '$1,000.00',
        type: 'visa',
        expiry: '12/26',
        ...overrides,
    };
};

export const maskCardNumber = (cardNumber: string): string => {
    if (cardNumber.length < 4) return cardNumber;
    const lastFour = cardNumber.slice(-4);
    return `**** **** **** ${lastFour}`;
};

export const cardToSummary = (card: Card): CardSummary => {
    return {
        id: card.id,
        cardNumber: maskCardNumber(card.cardNumber),
        cardholderName: card.cardholderName,
        balance: card.balance,
        formattedBalance: card.formattedBalance,
        type: card.type,
        expiry: card.expiry,
    };
};

describe('Card Utilities', () => {
    describe('createMockCard', () => {
        it('should create a default mock card', () => {
            const mockCard = createMockCard();

            expect(isCard(mockCard)).toBe(true);
            expect(mockCard.id).toBe('mock-card-123');
            expect(mockCard.type).toBe('visa');
            expect(mockCard.isActive).toBe(true);
        });

        it('should allow overriding default values', () => {
            const mockCard = createMockCard({
                type: 'mastercard',
                balance: 2500,
                isActive: false,
                cardholderName: 'Custom User',
            });

            expect(mockCard.type).toBe('mastercard');
            expect(mockCard.balance).toBe(2500);
            expect(mockCard.isActive).toBe(false);
            expect(mockCard.cardholderName).toBe('Custom User');
            expect(mockCard.id).toBe('mock-card-123'); // Should keep default
        });
    });

    describe('createMockCardSummary', () => {
        it('should create a default mock card summary', () => {
            const mockSummary = createMockCardSummary();

            expect(isCardSummary(mockSummary)).toBe(true);
            expect(mockSummary.id).toBe('mock-summary-123');
            expect(mockSummary.cardNumber).toContain('****');
        });

        it('should allow overriding default values', () => {
            const mockSummary = createMockCardSummary({
                type: 'mastercard',
                balance: 3000,
                cardNumber: '**** **** **** 9999',
            });

            expect(mockSummary.type).toBe('mastercard');
            expect(mockSummary.balance).toBe(3000);
            expect(mockSummary.cardNumber).toBe('**** **** **** 9999');
        });
    });

    describe('maskCardNumber', () => {
        it('should mask card numbers correctly', () => {
            expect(maskCardNumber('1234567890123456')).toBe('**** **** **** 3456');
            expect(maskCardNumber('4111111111111111')).toBe('**** **** **** 1111');
            expect(maskCardNumber('5555555555554444')).toBe('**** **** **** 4444');
        });

        it('should handle short card numbers', () => {
            expect(maskCardNumber('123')).toBe('123');
            expect(maskCardNumber('1234')).toBe('**** **** **** 1234');
        });

        it('should handle empty string', () => {
            expect(maskCardNumber('')).toBe('');
        });
    });

    describe('cardToSummary', () => {
        it('should convert Card to CardSummary correctly', () => {
            const card: Card = {
                id: 'card-123',
                cardNumber: '1234567890123456',
                cardholderName: 'John Doe',
                balance: 2500.75,
                formattedBalance: '$2,500.75',
                type: 'visa',
                expiry: '12/26',
                cvv: '123',
                isActive: true,
            };

            const summary = cardToSummary(card);

            expect(isCardSummary(summary)).toBe(true);
            expect(summary.id).toBe(card.id);
            expect(summary.cardNumber).toBe('**** **** **** 3456');
            expect(summary.cardholderName).toBe(card.cardholderName);
            expect(summary.balance).toBe(card.balance);
            expect(summary.formattedBalance).toBe(card.formattedBalance);
            expect(summary.type).toBe(card.type);
            expect(summary.expiry).toBe(card.expiry);

            // Should not include cvv and isActive
            expect('cvv' in summary).toBe(false);
            expect('isActive' in summary).toBe(false);
        });

        it('should work with different card types', () => {
            const visaCard = createMockCard({ type: 'visa' });
            const mastercardCard = createMockCard({ type: 'mastercard' });

            const visaSummary = cardToSummary(visaCard);
            const mastercardSummary = cardToSummary(mastercardCard);

            expect(visaSummary.type).toBe('visa');
            expect(mastercardSummary.type).toBe('mastercard');
        });
    });
});

// Additional validation utilities
export const validateCardExpiry = (expiry: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return regex.test(expiry);
};

export const validateCvv = (cvv: string): boolean => {
    const regex = /^\d{3,4}$/;
    return regex.test(cvv);
};

export const validateCardNumber = (cardNumber: string): boolean => {
    // Simple validation - should be 13-19 digits
    const cleanNumber = cardNumber.replace(/\s/g, '');
    return /^\d{13,19}$/.test(cleanNumber);
};

describe('Card Validation Utilities', () => {
    describe('validateCardExpiry', () => {
        it('should validate correct expiry formats', () => {
            expect(validateCardExpiry('12/26')).toBe(true);
            expect(validateCardExpiry('01/25')).toBe(true);
            expect(validateCardExpiry('06/30')).toBe(true);
        });

        it('should reject invalid expiry formats', () => {
            expect(validateCardExpiry('13/26')).toBe(false); // Invalid month
            expect(validateCardExpiry('00/26')).toBe(false); // Invalid month
            expect(validateCardExpiry('12/2026')).toBe(false); // Wrong year format
            expect(validateCardExpiry('12-26')).toBe(false); // Wrong separator
            expect(validateCardExpiry('1/26')).toBe(false); // Single digit month
        });
    });

    describe('validateCvv', () => {
        it('should validate correct CVV formats', () => {
            expect(validateCvv('123')).toBe(true);
            expect(validateCvv('456')).toBe(true);
            expect(validateCvv('1234')).toBe(true); // 4-digit CVV for Amex
        });

        it('should reject invalid CVV formats', () => {
            expect(validateCvv('12')).toBe(false); // Too short
            expect(validateCvv('12345')).toBe(false); // Too long
            expect(validateCvv('abc')).toBe(false); // Non-numeric
            expect(validateCvv('12a')).toBe(false); // Mixed characters
        });
    });

    describe('validateCardNumber', () => {
        it('should validate correct card number formats', () => {
            expect(validateCardNumber('1234567890123456')).toBe(true);
            expect(validateCardNumber('4111111111111111')).toBe(true);
            expect(validateCardNumber('5555555555554444')).toBe(true);
            expect(validateCardNumber('1234 5678 9012 3456')).toBe(true); // With spaces
        });

        it('should reject invalid card number formats', () => {
            expect(validateCardNumber('123456789012')).toBe(false); // Too short
            expect(validateCardNumber('12345678901234567890')).toBe(false); // Too long
            expect(validateCardNumber('1234abcd5678efgh')).toBe(false); // Non-numeric
            expect(validateCardNumber('')).toBe(false); // Empty string
        });
    });
});