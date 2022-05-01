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
import { useMemo, useRef } from "react";
import { formatDate } from "../utils/formatDate";
import useSWR from "swr";
import { fetchRoute } from "../utils/fetchRoute";
import { ClipLoader } from "react-spinners";
import { formatSlug } from "../utils/formatSlug";

interface ChartProps {
  slug: string;
}

export const Chart: React.FC<ChartProps> = ({ slug }) => {
  const chartRef = useRef();

  const { data, error, isValidating } = useSWR(
    `/api/metrics/historical?slug=${formatSlug(
      slug
    )}&days=${365}&currency=${"eur"}`,
    fetchRoute
  );

  const mapData = (data: any) => {
    const prices: number[] = [];
    const labels: string[] = [];

    if (!data) {
      return { prices, labels };
    }

    data.prices.map((entries: number[]) => {
      prices.push(entries[1]);
      labels.push(formatDate(entries[0]));
    });
    return { prices, labels };
  };

  const { prices, labels } = useMemo(() => mapData(data), [data]);

  if (error) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        Something went wrong...
      </div>
    );
  }

  if (!data || isValidating) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ClipLoader size={40} />
      </div>
    );
  }

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
