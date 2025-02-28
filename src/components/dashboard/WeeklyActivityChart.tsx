import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { WeeklyActivity } from "../../types";
import { createBarChartData, chartColors } from "../../utils/charts";
import { formatCurrency } from "../../utils/formatters";
import { use } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WeeklyActivityChartProps {
  data: WeeklyActivity;
}

const WeeklyActivityChart: React.FC<WeeklyActivityChartProps> = ({ data }) => {
  // Use chart utils to create data
  const chartData = createBarChartData(data.labels, [
    {
      label: "Withdrawals",
      data: data.withdrawals,
      color: chartColors.black,
    },
    {
      label: "Deposits",
      data: data.deposits,
      color: chartColors.blue,
    },
  ]);

  const options = {
    color: "#718EBF",
    pointStyle: "circle",
    borderRadius: 10,
    responsive: true,
    // barThickness: 5,
    barPercentage: 0.5,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#718EBF",
          // Use formatter util
          callback: function (value: any) {
            return formatCurrency(value, "USD", false);
          },
          stepSize: 100,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#718EBF",
        },
      },
    },
    plugins: {
      legend: {
        align: "end" as const,
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            // Use formatter util
            return `${context.dataset.label}: ${formatCurrency(
              context.parsed.y
            )}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-primary-title">
        Weekly Activity
      </h3>
      <div className="bg-white rounded-3xl shadow p-6">
        <div className="h-60">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivityChart;
