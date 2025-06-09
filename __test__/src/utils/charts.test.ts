import {
    chartColors,
    createLineChartData,
    createBarChartData,
    createPieChartData,
    getChartGradient,
} from '../../../src/utils/charts';

describe('charts', () => {
    describe('chartColors', () => {
        it('should have all required colors defined', () => {
            expect(chartColors.blue).toBe('#3B82F6');
            expect(chartColors.indigo).toBe('#4F46E5');
            expect(chartColors.green).toBe('#10B981');
            expect(chartColors.red).toBe('#EF4444');
            expect(chartColors.yellow).toBe('#F59E0B');
            expect(chartColors.purple).toBe('#8B5CF6');
            expect(chartColors.gray).toBe('#6B7280');
            expect(chartColors.black).toBe('#111111');
            expect(chartColors.white).toBe('#FFFFFF');
        });

        it('should have transparent versions of colors', () => {
            expect(chartColors.blueTransparent).toBe('rgba(59, 130, 246, 0.2)');
            expect(chartColors.indigoTransparent).toBe('rgba(79, 70, 229, 0.2)');
            expect(chartColors.greenTransparent).toBe('rgba(16, 185, 129, 0.2)');
            expect(chartColors.redTransparent).toBe('rgba(239, 68, 68, 0.2)');
            expect(chartColors.yellowTransparent).toBe('rgba(245, 158, 11, 0.2)');
        });
    });

    describe('createLineChartData', () => {
        it('should create basic line chart data', () => {
            const labels = ['Jan', 'Feb', 'Mar'];
            const data = [10, 20, 30];
            const label = 'Sales';

            const result = createLineChartData(labels, data, label);

            expect(result).toEqual({
                labels,
                datasets: [{
                    label,
                    data,
                    borderColor: chartColors.blue,
                    backgroundColor: undefined,
                    tension: 0.4,
                    borderWidth: 2,
                    fill: false,
                }],
            });
        });

        it('should create line chart data with custom color', () => {
            const labels = ['A', 'B', 'C'];
            const data = [1, 2, 3];
            const label = 'Test';
            const color = '#FF0000';

            const result = createLineChartData(labels, data, label, color);

            expect(result.datasets[0].borderColor).toBe(color);
        });

        it('should create filled line chart data', () => {
            const labels = ['A', 'B', 'C'];
            const data = [1, 2, 3];
            const label = 'Test';
            const color = '#FF0000';
            const fill = true;

            const result = createLineChartData(labels, data, label, color, fill);

            expect(result.datasets[0].fill).toBe(true);
            expect(result.datasets[0].backgroundColor).toBe('#FF000020');
        });

        it('should handle empty data arrays', () => {
            const result = createLineChartData([], [], 'Empty');

            expect(result).toEqual({
                labels: [],
                datasets: [{
                    label: 'Empty',
                    data: [],
                    borderColor: chartColors.blue,
                    backgroundColor: undefined,
                    tension: 0.4,
                    borderWidth: 2,
                    fill: false,
                }],
            });
        });

        it('should use default values when parameters are not provided', () => {
            const labels = ['A', 'B'];
            const data = [1, 2];
            const label = 'Default Test';

            const result = createLineChartData(labels, data, label);

            expect(result.datasets[0].borderColor).toBe(chartColors.blue);
            expect(result.datasets[0].fill).toBe(false);
            expect(result.datasets[0].backgroundColor).toBeUndefined();
        });
    });

    describe('createBarChartData', () => {
        it('should create bar chart data with single dataset', () => {
            const labels = ['Q1', 'Q2', 'Q3', 'Q4'];
            const datasets = [{
                label: 'Revenue',
                data: [100, 200, 150, 250],
                color: chartColors.blue,
            }];

            const result = createBarChartData(labels, datasets);

            expect(result).toEqual({
                labels,
                datasets: [{
                    label: 'Revenue',
                    data: [100, 200, 150, 250],
                    backgroundColor: chartColors.blue,
                    borderColor: chartColors.blue,
                    borderWidth: 1,
                }],
            });
        });

        it('should create bar chart data with multiple datasets', () => {
            const labels = ['Jan', 'Feb', 'Mar'];
            const datasets = [
                {
                    label: 'Sales',
                    data: [10, 20, 30],
                    color: chartColors.blue,
                },
                {
                    label: 'Costs',
                    data: [5, 15, 25],
                    color: chartColors.red,
                },
            ];

            const result = createBarChartData(labels, datasets);

            expect(result.labels).toEqual(labels);
            expect(result.datasets).toHaveLength(2);

            expect(result.datasets[0]).toEqual({
                label: 'Sales',
                data: [10, 20, 30],
                backgroundColor: chartColors.blue,
                borderColor: chartColors.blue,
                borderWidth: 1,
            });

            expect(result.datasets[1]).toEqual({
                label: 'Costs',
                data: [5, 15, 25],
                backgroundColor: chartColors.red,
                borderColor: chartColors.red,
                borderWidth: 1,
            });
        });

        it('should handle empty datasets', () => {
            const result = createBarChartData(['A', 'B'], []);

            expect(result).toEqual({
                labels: ['A', 'B'],
                datasets: [],
            });
        });

        it('should handle dataset with zero values', () => {
            const labels = ['A', 'B', 'C'];
            const datasets = [{
                label: 'Zero Data',
                data: [0, 0, 0],
                color: chartColors.gray,
            }];

            const result = createBarChartData(labels, datasets);

            expect(result.datasets[0].data).toEqual([0, 0, 0]);
            expect(result.datasets[0].backgroundColor).toBe(chartColors.gray);
        });
    });

    describe('createPieChartData', () => {
        it('should create pie chart data', () => {
            const labels = ['Desktop', 'Mobile', 'Tablet'];
            const data = [60, 30, 10];
            const colors = [chartColors.blue, chartColors.green, chartColors.yellow];

            const result = createPieChartData(labels, data, colors);

            expect(result).toEqual({
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1,
                }],
            });
        });

        it('should handle single slice pie chart', () => {
            const labels = ['Single'];
            const data = [100];
            const colors = [chartColors.blue];

            const result = createPieChartData(labels, data, colors);

            expect(result.datasets[0]).toEqual({
                data: [100],
                backgroundColor: [chartColors.blue],
                borderColor: [chartColors.blue],
                borderWidth: 1,
            });
        });

        it('should handle empty pie chart data', () => {
            const result = createPieChartData([], [], []);

            expect(result).toEqual({
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 1,
                }],
            });
        });

        it('should work with mismatched array lengths', () => {
            const labels = ['A', 'B', 'C'];
            const data = [10, 20]; // Shorter than labels
            const colors = [chartColors.red, chartColors.blue, chartColors.green, chartColors.yellow]; // Longer than labels

            const result = createPieChartData(labels, data, colors);

            expect(result.labels).toEqual(labels);
            expect(result.datasets[0].data).toEqual(data);
            expect(result.datasets[0].backgroundColor).toEqual(colors);
        });
    });

    describe('getChartGradient', () => {
        let mockContext: CanvasRenderingContext2D;
        let mockGradient: CanvasGradient;

        beforeEach(() => {
            // Create mock gradient
            mockGradient = {
                addColorStop: jest.fn(),
            } as unknown as CanvasGradient;

            // Create mock context
            mockContext = {
                createLinearGradient: jest.fn().mockReturnValue(mockGradient),
            } as unknown as CanvasRenderingContext2D;
        });

        it('should create a linear gradient', () => {
            const color = '#3B82F6';
            const result = getChartGradient(mockContext, color);

            expect(mockContext.createLinearGradient).toHaveBeenCalledWith(0, 0, 0, 400);
            expect(result).toBe(mockGradient);
        });

        it('should add color stops to gradient', () => {
            const color = '#FF0000';
            getChartGradient(mockContext, color);

            expect(mockGradient.addColorStop).toHaveBeenCalledWith(0, '#FF000040');
            expect(mockGradient.addColorStop).toHaveBeenCalledWith(1, '#FF000000');
        });

        it('should work with different color formats', () => {
            const colors = ['#3B82F6', '#FF0000', '#00FF00'];

            colors.forEach(color => {
                getChartGradient(mockContext, color);

                expect(mockContext.createLinearGradient).toHaveBeenCalledWith(0, 0, 0, 400);
                expect(mockGradient.addColorStop).toHaveBeenCalledWith(0, `${color}40`);
                expect(mockGradient.addColorStop).toHaveBeenCalledWith(1, `${color}00`);
            });
        });

        it('should handle gradient creation consistently', () => {
            const color = chartColors.blue;
            const gradient1 = getChartGradient(mockContext, color);
            const gradient2 = getChartGradient(mockContext, color);

            // Both should create the same type of gradient
            expect(gradient1).toBe(mockGradient);
            expect(gradient2).toBe(mockGradient);

            // Should be called multiple times
            expect(mockContext.createLinearGradient).toHaveBeenCalledTimes(2);
        });
    });

    describe('integration tests', () => {
        it('should work with chart colors in different chart types', () => {
            const labels = ['A', 'B', 'C'];
            const data = [10, 20, 30];

            // Line chart with predefined color
            const lineChart = createLineChartData(labels, data, 'Line', chartColors.blue);
            expect(lineChart.datasets[0].borderColor).toBe(chartColors.blue);

            // Bar chart with predefined colors
            const barChart = createBarChartData(labels, [{
                label: 'Bar',
                data,
                color: chartColors.green,
            }]);
            expect(barChart.datasets[0].backgroundColor).toBe(chartColors.green);

            // Pie chart with multiple predefined colors
            const pieChart = createPieChartData(labels, data, [
                chartColors.red,
                chartColors.yellow,
                chartColors.purple,
            ]);
            expect(pieChart.datasets[0].backgroundColor).toEqual([
                chartColors.red,
                chartColors.yellow,
                chartColors.purple,
            ]);
        });

        it('should create compatible chart data structures', () => {
            const labels = ['Q1', 'Q2', 'Q3', 'Q4'];
            const data = [100, 150, 120, 180];

            const lineChart = createLineChartData(labels, data, 'Revenue');
            const barChart = createBarChartData(labels, [{
                label: 'Revenue',
                data,
                color: chartColors.blue,
            }]);

            // Both should have the same structure for labels
            expect(lineChart.labels).toEqual(barChart.labels);

            // Both should have datasets array
            expect(Array.isArray(lineChart.datasets)).toBe(true);
            expect(Array.isArray(barChart.datasets)).toBe(true);

            // Both should have data in the same format
            expect(lineChart.datasets[0].data).toEqual(barChart.datasets[0].data);
        });
    });
}); 