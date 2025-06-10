// src/components/dashboard/BalanceHistory.tsx
import { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
  ChartOptions,
  Chart,
} from "chart.js";
import { BalanceHistory as BalanceHistoryType } from "../../types";
import {
  createLineChartData,
  chartColors,
  getChartGradient,
} from "../../utils/charts";
import { formatCurrency } from "../../utils/formatters";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BalanceHistoryProps {
  data: BalanceHistoryType;
}

const BalanceHistory: React.FC<BalanceHistoryProps> = ({ data }) => {
  const chartRef = useRef<Chart<'line', number[], string> | null>(null);

  // Use chart utils to create line chart data
  const chartData = createLineChartData(
    data.labels,
    data.values,
    "Balance",
    chartColors.indigo,
    true
  );

  // Apply gradient fill using chart utils
  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      const ctx = chart.ctx;
      if (ctx) {
        const gradient = getChartGradient(ctx, chartColors.indigo);

        // Apply the gradient to the chart dataset
        if (
          chart.data &&
          chart.data.datasets &&
          chart.data.datasets.length > 0
        ) {
          chart.data.datasets[0].backgroundColor = gradient;
          chart.update();
        }
      }
    }
  }, [data]);

  const options: ChartOptions<'line'> = {
    color: "#718EBF",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            // Use formatter util for currency display
            return `Balance: ${formatCurrency(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
        },
        ticks: {
          color: "#718EBF",
          // Use formatter util
          callback: function (value: string | number) {
            return formatCurrency(Number(value), "USD", false);
          },
          stepSize: 200,
        },
      },
      x: {
        grid: {
          display: true,
        },
        ticks: {
          color: "#718EBF",
        },
      },
    },
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-primary-title">
        Balance History
      </h3>
      <div className="bg-white rounded-3xl shadow p-4">
        <div className="h-48">
          <Line ref={chartRef} data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BalanceHistory;
