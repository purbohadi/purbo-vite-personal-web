import {
    formatCurrency,
    formatNumber,
    formatDate,
    formatRelativeTime,
    formatCardNumber,
    formatPercentage,
} from '../../../src/utils/formatters';

describe('formatters', () => {
    describe('formatCurrency', () => {
        it('should format currency with default USD', () => {
            expect(formatCurrency(1234.56)).toBe('$1,234.56');
            expect(formatCurrency(1000)).toBe('$1,000');
            expect(formatCurrency(0)).toBe('$0');
        });

        it('should format currency with different currency codes', () => {
            expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
            expect(formatCurrency(1234.56, 'GBP')).toBe('£1,234.56');
        });

        it('should format currency without symbol', () => {
            expect(formatCurrency(1234.56, 'USD', false)).toBe('1,234.56');
            expect(formatCurrency(1000, 'USD', false)).toBe('1,000');
        });

        it('should handle decimal values correctly', () => {
            expect(formatCurrency(1234.50)).toBe('$1,234.5');
            expect(formatCurrency(1234.99)).toBe('$1,234.99');
            expect(formatCurrency(1234.01)).toBe('$1,234.01');
        });

        it('should handle negative values', () => {
            expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
        });
    });

    describe('formatNumber', () => {
        it('should format numbers with commas', () => {
            expect(formatNumber(1234)).toBe('1,234');
            expect(formatNumber(1234567)).toBe('1,234,567');
            expect(formatNumber(1000)).toBe('1,000');
        });

        it('should handle small numbers', () => {
            expect(formatNumber(123)).toBe('123');
            expect(formatNumber(0)).toBe('0');
        });

        it('should handle negative numbers', () => {
            expect(formatNumber(-1234)).toBe('-1,234');
        });

        it('should handle decimal numbers', () => {
            expect(formatNumber(1234.56)).toBe('1,234.56');
        });
    });

    describe('formatDate', () => {
        const testDate = new Date('2023-06-15T10:30:00Z');

        it('should format date in long format by default', () => {
            const result = formatDate(testDate);
            expect(result).toBe('June 15, 2023');
        });

        it('should format date in short format', () => {
            const result = formatDate(testDate, 'short');
            expect(result).toBe('Jun 15, 2023');
        });

        it('should handle string dates', () => {
            const result = formatDate('2023-06-15T10:30:00Z', 'long');
            expect(result).toBe('June 15, 2023');
        });

        it('should handle timestamp numbers', () => {
            const timestamp = testDate.getTime();
            const result = formatDate(timestamp, 'long');
            expect(result).toBe('June 15, 2023');
        });

        it('should format relative time', () => {
            const result = formatDate(testDate, 'relative');
            // This will depend on the current date, so we just check it returns a string
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('formatRelativeTime', () => {
        let originalDate: DateConstructor;

        beforeEach(() => {
            // Mock the Date constructor to return a consistent time
            originalDate = global.Date;
            global.Date = jest.fn().mockImplementation((dateString?: string) => {
                if (dateString) {
                    return new originalDate(dateString);
                }
                return new originalDate('2023-06-15T10:30:00Z');
            }) as jest.MockedClass<typeof Date>;
            (global.Date as jest.MockedClass<typeof Date>).now = jest.fn(() => new originalDate('2023-06-15T10:30:00Z').getTime());
        });

        afterEach(() => {
            global.Date = originalDate;
        });

        it('should format seconds ago', () => {
            const date = new originalDate('2023-06-15T10:29:30Z'); // 30 seconds ago
            expect(formatRelativeTime(date)).toBe('30 seconds ago');
        });

        it('should format single second ago', () => {
            const date = new originalDate('2023-06-15T10:29:59Z'); // 1 second ago
            expect(formatRelativeTime(date)).toBe('1 second ago');
        });

        it('should format minutes ago', () => {
            const date = new originalDate('2023-06-15T10:25:00Z'); // 5 minutes ago
            expect(formatRelativeTime(date)).toBe('5 minutes ago');
        });

        it('should format single minute ago', () => {
            const date = new originalDate('2023-06-15T10:29:00Z'); // 1 minute ago
            expect(formatRelativeTime(date)).toBe('1 minute ago');
        });

        it('should format hours ago', () => {
            const date = new originalDate('2023-06-15T08:30:00Z'); // 2 hours ago
            expect(formatRelativeTime(date)).toBe('2 hours ago');
        });

        it('should format single hour ago', () => {
            const date = new originalDate('2023-06-15T09:30:00Z'); // 1 hour ago
            expect(formatRelativeTime(date)).toBe('1 hour ago');
        });

        it('should format days ago', () => {
            const date = new originalDate('2023-06-13T10:30:00Z'); // 2 days ago
            expect(formatRelativeTime(date)).toBe('2 days ago');
        });

        it('should format single day ago', () => {
            const date = new originalDate('2023-06-14T10:30:00Z'); // 1 day ago
            expect(formatRelativeTime(date)).toBe('1 day ago');
        });

        it('should fallback to short date format for older dates', () => {
            const date = new originalDate('2023-05-01T10:30:00Z'); // More than 30 days ago
            const result = formatRelativeTime(date);
            expect(result).toBe('May 1, 2023');
        });
    });

    describe('formatCardNumber', () => {
        it('should mask card number with default settings', () => {
            const result = formatCardNumber('1234567890123456');
            expect(result).toBe('1234 **** **** ****');
        });

        it('should handle card numbers with spaces', () => {
            const result = formatCardNumber('1234 5678 9012 3456');
            expect(result).toBe('1234 **** **** ****');
        });

        it('should handle card numbers with dashes', () => {
            const result = formatCardNumber('1234-5678-9012-3456');
            expect(result).toBe('1234 **** **** ****');
        });

        it('should handle shorter card numbers', () => {
            const result = formatCardNumber('123456789012');
            expect(result).toBe('1234 **** ****');
        });

        it('should handle different masked segments', () => {
            const result = formatCardNumber('1234567890123456', 2);
            expect(result).toBe('1234 **** **** 3456');
        });

        it('should handle very short card numbers', () => {
            const result = formatCardNumber('12345678');
            expect(result).toBe('1234 ****');
        });
    });

    describe('formatPercentage', () => {
        it('should format decimal as percentage', () => {
            expect(formatPercentage(0.25)).toBe('25.0%');
            expect(formatPercentage(0.5)).toBe('50.0%');
            expect(formatPercentage(1)).toBe('100.0%');
        });

        it('should handle small decimals', () => {
            expect(formatPercentage(0.001)).toBe('0.1%');
            expect(formatPercentage(0.0)).toBe('0.0%');
        });

        it('should handle values over 100%', () => {
            expect(formatPercentage(1.5)).toBe('150.0%');
            expect(formatPercentage(2.5)).toBe('250.0%');
        });

        it('should handle negative values', () => {
            expect(formatPercentage(-0.25)).toBe('-25.0%');
        });

        it('should round to one decimal place', () => {
            expect(formatPercentage(0.12345)).toBe('12.3%');
            expect(formatPercentage(0.12678)).toBe('12.7%');
        });
    });
}); 