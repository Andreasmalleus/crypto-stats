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
} from "chart.js";

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
import { Line } from "react-chartjs-2";
import { historical } from "../data";
import { formatCurrency } from "../utils/formatCurrency";
import { formatPercentageToTwoDecimalPlaces } from "../utils/formatPercentage";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "../utils/formatDate";

interface ChartProps {}

export const Chart: React.FC<ChartProps> = ({}) => {
  const chartRef = useRef();

  const [prices, setPrices] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const tempPrices: number[] = [];
    const tempLabels: string[] = [];

    historical.prices.map((entries) => {
      tempPrices.push(entries[1]);
      tempLabels.push(formatDate(entries[0]));
    });

    setPrices([...tempPrices]);
    setLabels([...tempLabels]);
  }, []);

  return (
    <div>
      <h1 className="font-headings text-2xl mb-6">Bitcoin to EUR Chart</h1>
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: "Bitcoin to EUR chart",
              data: prices,
              borderColor: "rgb(43, 183, 113)",
              fill: "start",
              backgroundColor: "rgb(255,255,255)",
              borderWidth: 2,
              tension: 1,
              pointRadius: 0,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: "index",
              intersect: false,
              padding: 20,
              backgroundColor: "rgb(255,255,255,1)",
              cornerRadius: 10,
              displayColors: false,
              caretSize: 0,
              callbacks: {
                label: label,
              },
              titleColor: "rgb(0, 0, 0)",
              titleMarginBottom: 10,
              titleFont: {
                family: "Inter Regular",
                size: 13,
              },
              bodyColor: "rgb(0,0,0)",
              bodyFont: {
                family: "Inter Regular",
                size: 12,
              },
              borderColor: "rgb(238, 243, 248,.2)",
              borderWidth: 5,
            },
          },
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                maxTicksLimit: 0,
                display: false,
              },
            },
            y: {
              ticks: {
                maxTicksLimit: 6,
                callback: function (value: string | number) {
                  return `${value}K`;
                },
              },
            },
          },
        }}
        ref={chartRef}
      />
    </div>
  );
};

const label = (tooltipItems: TooltipItem<"line">) => {
  return "Price: €" + tooltipItems.formattedValue;
};
