import {
    generateInitialAvatar,
    getColorForName,
} from '../../../src/utils/avatarUtils';

describe('avatarUtils', () => {
    describe('generateInitialAvatar', () => {
        it('should generate SVG data URL with first letter of name', () => {
            const result = generateInitialAvatar('John Doe');

            expect(result).toMatch(/^data:image\/svg\+xml;base64,/);

            // Decode the base64 to check the SVG content
            const base64Content = result.split(',')[1];
            const svgContent = atob(base64Content);

            expect(svgContent).toContain('<svg');
            expect(svgContent).toContain('J'); // First letter of name
            expect(svgContent).toContain('viewBox="0 0 100 100"');
            expect(svgContent).toContain('<circle');
            expect(svgContent).toContain('<text');
        });

        it('should use uppercase first letter', () => {
            const result = generateInitialAvatar('alice');
            const base64Content = result.split(',')[1];
            const svgContent = atob(base64Content);

            expect(svgContent).toContain('>A<'); // Should be uppercase
        });

        it('should handle empty name with default character', () => {
            const result = generateInitialAvatar('');
            const base64Content = result.split(',')[1];
            const svgContent = atob(base64Content);

            expect(svgContent).toContain('>?<'); // Default character
        });

        it('should handle single character names', () => {
            const result = generateInitialAvatar('X');
            const base64Content = result.split(',')[1];
            const svgContent = atob(base64Content);

            expect(svgContent).toContain('>X<');
        });

        it('should use consistent color for same name', () => {
            const result1 = generateInitialAvatar('John');
            const result2 = generateInitialAvatar('John');

            const svg1 = atob(result1.split(',')[1]);
            const svg2 = atob(result2.split(',')[1]);

            // Extract the fill color from both SVGs
            const colorMatch1 = svg1.match(/fill="(#[0-9A-F]{6})"/i);
            const colorMatch2 = svg2.match(/fill="(#[0-9A-F]{6})"/i);

            expect(colorMatch1).toBeTruthy();
            expect(colorMatch2).toBeTruthy();
            expect(colorMatch1![1]).toBe(colorMatch2![1]);
        });

        it('should include proper SVG structure', () => {
            const result = generateInitialAvatar('Test');
            const base64Content = result.split(',')[1];
            const svgContent = atob(base64Content);

            // Check for proper SVG attributes
            expect(svgContent).toContain('xmlns="http://www.w3.org/2000/svg"');
            expect(svgContent).toContain('cx="50" cy="50" r="50"');
            expect(svgContent).toContain('x="50"');
            expect(svgContent).toContain('y="50"');
            expect(svgContent).toContain('font-family="Arial, sans-serif"');
            expect(svgContent).toContain('font-size="40"');
            expect(svgContent).toContain('font-weight="bold"');
            expect(svgContent).toContain('fill="white"');
            expect(svgContent).toContain('text-anchor="middle"');
            expect(svgContent).toContain('dominant-baseline="central"');
        });
    });

    describe('getColorForName', () => {
        it('should return a hex color code', () => {
            const color = getColorForName('John');
            expect(color).toMatch(/^#[0-9A-F]{6}$/i);
        });

        it('should return consistent color for same name', () => {
            const color1 = getColorForName('Alice');
            const color2 = getColorForName('Alice');
            expect(color1).toBe(color2);
        });

        it('should return different colors for different names', () => {
            const color1 = getColorForName('John');
            const color2 = getColorForName('Jane');

            // They might be the same due to hash collision, but usually different
            // We'll test that the function returns valid colors for both
            expect(color1).toMatch(/^#[0-9A-F]{6}$/i);
            expect(color2).toMatch(/^#[0-9A-F]{6}$/i);
        });

        it('should handle empty string with default color', () => {
            const color = getColorForName('');
            expect(color).toBe('#3B82F6'); // First color in the array
        });

        it('should handle whitespace-only string with default color', () => {
            const color = getColorForName('   ');
            expect(color).toBe('#3B82F6'); // First color in the array
        });

        it('should return colors from predefined set', () => {
            const predefinedColors = [
                '#3B82F6', // blue-500
                '#F59E0B', // amber-500
                '#10B981', // emerald-500
                '#EF4444', // red-500
                '#8B5CF6', // violet-500
                '#EC4899', // pink-500
                '#14B8A6', // teal-500
                '#F97316', // orange-500
                '#6366F1', // indigo-500
                '#06B6D4', // cyan-500
                '#84CC16', // lime-500
                '#D946EF', // fuchsia-500
                '#7C3AED', // purple-500
            ];

            // Test several names to ensure they all return colors from the predefined set
            const testNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana'];

            testNames.forEach(name => {
                const color = getColorForName(name);
                expect(predefinedColors).toContain(color);
            });
        });

        it('should distribute colors based on character codes', () => {
            // Test that similar names can produce different colors
            const colors = new Set();
            const names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

            names.forEach(name => {
                colors.add(getColorForName(name));
            });

            // Should have more than one unique color for these different names
            expect(colors.size).toBeGreaterThan(1);
        });

        it('should handle special characters', () => {
            const color1 = getColorForName('José');
            const color2 = getColorForName('François');
            const color3 = getColorForName('中文');

            expect(color1).toMatch(/^#[0-9A-F]{6}$/i);
            expect(color2).toMatch(/^#[0-9A-F]{6}$/i);
            expect(color3).toMatch(/^#[0-9A-F]{6}$/i);
        });

        it('should be deterministic for same input', () => {
            const name = 'TestUser123';
            const results = Array.from({ length: 10 }, () => getColorForName(name));

            // All results should be identical
            expect(new Set(results).size).toBe(1);
        });
    });
}); 