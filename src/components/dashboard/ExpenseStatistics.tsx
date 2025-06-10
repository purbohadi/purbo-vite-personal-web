import { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, TooltipItem, Chart } from "chart.js";
import { ExpenseCategory } from "../../types";
import { createPieChartData } from "../../utils/charts";
import { formatPercentage } from "../../utils/formatters";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseStatisticsProps {
  categories: ExpenseCategory[];
}

interface LabelPosition {
  x: number;
  y: number;
  label: string;
  percentage: string;
  color: string;
}

const ExpenseStatistics: React.FC<ExpenseStatisticsProps> = ({
  categories,
}) => {
  const chartRef = useRef<Chart<'pie', number[], string> | null>(null);
  const [labelPositions, setLabelPositions] = useState<LabelPosition[]>([]);

  const chartData = createPieChartData(
    categories.map((category) => category.name),
    categories.map((category) => category.percentage),
    categories.map((category) => category.color)
  );

  const chartDataWithSpacing = {
    ...chartData,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      borderWidth: 4, // Increase border width for more visible spacing
      borderColor: "#ffffff", // White borders between segments
      hoverOffset: 10, // Increase segment offset on hover for better visibility
    })),
  };

  const options: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'pie'>) {
            return `$ ${Number(context.raw) * 10}`;
          },
        },
      },
    },
    cutout: "0%", // Make sure to use a percentage for cutout
    maintainAspectRatio: false,
    animation: {
      // After animation is complete, calculate label positions
      onComplete: function () {
        // Only calculate once or when chart changes
        if (
          labelPositions.length === 0 ||
          labelPositions.length !== categories.length
        ) {
          calculateLabelPositions();
        }
      },
    },
  };

  // Calculate label positions based on chart's arc data
  const calculateLabelPositions = () => {
    if (!chartRef.current) return;

    const chart = chartRef.current;
    const positions: LabelPosition[] = [];

    // Get the center coordinates of the chart
    const centerX = chart.chartArea.width / 2 + chart.chartArea.left;
    const centerY = chart.chartArea.height / 2 + chart.chartArea.top;

    // Get the data from the chart
    const meta = chart.getDatasetMeta(0);
    const radius = Math.min(chart.chartArea.width, chart.chartArea.height) / 2;

    // For each arc in the chart
    meta.data.forEach((arc, index: number) => {
      // Get the middle angle of the arc in radians
      const startAngle = (arc as { startAngle: number; endAngle: number }).startAngle;
      const endAngle = (arc as { startAngle: number; endAngle: number }).endAngle;
      const middleAngle = (startAngle + endAngle) / 2;

      // Calculate the position at 2/3 distance from center to edge
      // This places the label in the middle of each segment
      const distanceFromCenter = radius * 0.67;

      // Calculate x and y coordinates for the label
      const x = centerX + Math.cos(middleAngle) * distanceFromCenter;
      const y = centerY + Math.sin(middleAngle) * distanceFromCenter;

      // Get category data
      const category = categories[index];

      positions.push({
        x,
        y,
        label: category.name,
        percentage: `${formatPercentage(category.percentage / 100).replace(
          "%",
          ""
        )}%`,
        color: "white", // White text on colored background
      });
    });

    setLabelPositions(positions);
  };

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      setLabelPositions([]); // Reset positions to trigger recalculation
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-primary-title">
        Expense Statistics
      </h3>
      <div className="bg-white rounded-3xl shadow p-6">
        <div className="h-60 relative">
          <Pie data={chartDataWithSpacing} options={options} ref={chartRef} />

          {/* Dynamic labels positioned based on chart data */}
          <div className="absolute inset-0 pointer-events-none">
            {labelPositions.map((position, index) => (
              <div
                key={index}
                className="absolute text-center"
                style={{
                  left: position.x,
                  top: position.y,
                  transform: "translate(-50%, -50%)",
                  color: position.color,
                  textShadow: "0px 0px 2px rgba(0,0,0,0.8)",
                }}
              >
                <div className="font-bold text-sm">{position.percentage}</div>
                <div className="text-xs whitespace-nowrap">
                  {position.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseStatistics;
