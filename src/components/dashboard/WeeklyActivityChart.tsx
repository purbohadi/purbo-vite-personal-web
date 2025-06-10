import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import { WeeklyActivity } from "../../types";
import { createBarChartData, chartColors } from "../../utils/charts";
import { formatCurrency } from "../../utils/formatters";

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

  const options: ChartOptions<'bar'> = {
    color: "#718EBF",
    responsive: true,
    // barThickness: 5,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#718EBF",
          // Use formatter util
          callback: function (value: string | number) {
            return formatCurrency(Number(value), "USD", false);
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
          label: function (context: TooltipItem<'bar'>) {
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
