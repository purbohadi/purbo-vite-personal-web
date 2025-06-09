import {
    generateId,
    debounce,
    deepClone,
    groupBy,
    sortBy,
    chunkArray,
    rgbToHex,
    hexToRgb,
} from '../../../src/utils/helpers';

describe('helpers', () => {
    describe('generateId', () => {
        it('should generate a unique ID with default prefix', () => {
            const id = generateId();
            expect(id).toMatch(/^id-[a-z0-9]+-[a-z0-9]+$/);
            expect(id.length).toBeGreaterThan(10);
        });

        it('should generate a unique ID with custom prefix', () => {
            const id = generateId('user');
            expect(id).toMatch(/^user-[a-z0-9]+-[a-z0-9]+$/);
            expect(id.startsWith('user-')).toBe(true);
        });

        it('should generate different IDs on subsequent calls', () => {
            const id1 = generateId();
            const id2 = generateId();
            expect(id1).not.toBe(id2);
        });
    });

    describe('debounce', () => {
        it('should delay function execution', async () => {
            const mockFn = jest.fn();
            const debouncedFn = debounce(mockFn, 100);

            debouncedFn();
            expect(mockFn).not.toHaveBeenCalled();

            await new Promise(resolve => setTimeout(resolve, 150));
            expect(mockFn).toHaveBeenCalledTimes(1);
        });

        it('should cancel previous calls when called multiple times', async () => {
            const mockFn = jest.fn();
            const debouncedFn = debounce(mockFn, 100);

            debouncedFn();
            debouncedFn();
            debouncedFn();

            await new Promise(resolve => setTimeout(resolve, 150));
            expect(mockFn).toHaveBeenCalledTimes(1);
        });

        it('should pass arguments correctly', async () => {
            const mockFn = jest.fn();
            const debouncedFn = debounce(mockFn, 100);

            debouncedFn('arg1', 'arg2');

            await new Promise(resolve => setTimeout(resolve, 150));
            expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
        });
    });

    describe('deepClone', () => {
        it('should clone a simple object', () => {
            const original = { name: 'John', age: 30 };
            const cloned = deepClone(original);

            expect(cloned).toEqual(original);
            expect(cloned).not.toBe(original);
        });

        it('should clone a nested object', () => {
            const original = {
                user: { name: 'John', details: { age: 30, city: 'NYC' } },
                array: [1, 2, { nested: true }]
            };
            const cloned = deepClone(original);

            expect(cloned).toEqual(original);
            expect(cloned.user).not.toBe(original.user);
            expect(cloned.array).not.toBe(original.array);
            expect(cloned.array[2]).not.toBe(original.array[2]);
        });

        it('should clone arrays', () => {
            const original = [1, 2, 3, { nested: 'value' }];
            const cloned = deepClone(original);

            expect(cloned).toEqual(original);
            expect(cloned).not.toBe(original);
            expect(cloned[3]).not.toBe(original[3]);
        });
    });

    describe('groupBy', () => {
        it('should group objects by a key', () => {
            const users = [
                { name: 'John', department: 'IT' },
                { name: 'Jane', department: 'HR' },
                { name: 'Bob', department: 'IT' },
                { name: 'Alice', department: 'HR' },
            ];

            const grouped = groupBy(users, 'department');

            expect(grouped).toEqual({
                IT: [
                    { name: 'John', department: 'IT' },
                    { name: 'Bob', department: 'IT' },
                ],
                HR: [
                    { name: 'Jane', department: 'HR' },
                    { name: 'Alice', department: 'HR' },
                ],
            });
        });

        it('should handle empty array', () => {
            const result = groupBy([], 'key');
            expect(result).toEqual({});
        });

        it('should handle numeric keys', () => {
            const items = [
                { id: 1, value: 'a' },
                { id: 2, value: 'b' },
                { id: 1, value: 'c' },
            ];

            const grouped = groupBy(items, 'id');

            expect(grouped).toEqual({
                '1': [
                    { id: 1, value: 'a' },
                    { id: 1, value: 'c' },
                ],
                '2': [{ id: 2, value: 'b' }],
            });
        });
    });

    describe('sortBy', () => {
        const users = [
            { name: 'John', age: 30 },
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 35 },
        ];

        it('should sort by string key in ascending order', () => {
            const sorted = sortBy(users, 'name');
            expect(sorted.map(u => u.name)).toEqual(['Alice', 'Bob', 'John']);
        });

        it('should sort by string key in descending order', () => {
            const sorted = sortBy(users, 'name', 'desc');
            expect(sorted.map(u => u.name)).toEqual(['John', 'Bob', 'Alice']);
        });

        it('should sort by numeric key in ascending order', () => {
            const sorted = sortBy(users, 'age');
            expect(sorted.map(u => u.age)).toEqual([25, 30, 35]);
        });

        it('should sort by numeric key in descending order', () => {
            const sorted = sortBy(users, 'age', 'desc');
            expect(sorted.map(u => u.age)).toEqual([35, 30, 25]);
        });

        it('should not mutate the original array', () => {
            const originalOrder = users.map(u => u.name);
            sortBy(users, 'name');
            expect(users.map(u => u.name)).toEqual(originalOrder);
        });
    });

    describe('chunkArray', () => {
        it('should chunk array into specified sizes', () => {
            const array = [1, 2, 3, 4, 5, 6, 7, 8];
            const chunked = chunkArray(array, 3);

            expect(chunked).toEqual([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8],
            ]);
        });

        it('should handle empty array', () => {
            const chunked = chunkArray([], 3);
            expect(chunked).toEqual([]);
        });

        it('should handle chunk size larger than array', () => {
            const array = [1, 2, 3];
            const chunked = chunkArray(array, 5);

            expect(chunked).toEqual([[1, 2, 3]]);
        });

        it('should handle chunk size of 1', () => {
            const array = [1, 2, 3];
            const chunked = chunkArray(array, 1);

            expect(chunked).toEqual([[1], [2], [3]]);
        });
    });

    describe('rgbToHex', () => {
        it('should convert RGB to hex', () => {
            expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
            expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
            expect(rgbToHex(0, 0, 255)).toBe('#0000ff');
            expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
            expect(rgbToHex(0, 0, 0)).toBe('#000000');
        });

        it('should handle single digit hex values', () => {
            expect(rgbToHex(15, 15, 15)).toBe('#0f0f0f');
            expect(rgbToHex(1, 2, 3)).toBe('#010203');
        });
    });

    describe('hexToRgb', () => {
        it('should convert hex to RGB', () => {
            expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
            expect(hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0 });
            expect(hexToRgb('#0000ff')).toEqual({ r: 0, g: 0, b: 255 });
            expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
            expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
        });

        it('should handle hex without # prefix', () => {
            expect(hexToRgb('ff0000')).toEqual({ r: 255, g: 0, b: 0 });
        });

        it('should return null for invalid hex', () => {
            expect(hexToRgb('#invalid')).toBe(null);
            expect(hexToRgb('#ff')).toBe(null);
            expect(hexToRgb('')).toBe(null);
        });
    });
}); 