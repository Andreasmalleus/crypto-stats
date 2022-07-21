import { useEffect, useState } from "react";
import ReactHighcharts from "react-highcharts/ReactHighstock.src";
import { getChartOptions } from "./options";
import useSWR from "swr";
import { fetchRoute } from "../../utils/fetchRoute";
import { ClipLoader } from "react-spinners";

interface ChartProps {
  slug: string;
}

export const Chart: React.FC<ChartProps> = ({ slug }) => {
  const [days, setDays] = useState<string>("365");
  const [chartData, setChartData] = useState<number[][] | null>(null);

  const { data, error, isValidating } = useSWR(
    `/api/metrics/historical?slug=${slug}&days=${days}&currency=${"eur"}`,
    fetchRoute
  );

  console.log(data);

  useEffect(() => {
    if (data) {
      setChartData(data.prices);
    }
  }, [data, setChartData]);

  if (error) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        Something went wrong...
      </div>
    );
  }

  if (!chartData || isValidating) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ClipLoader size={40} />
      </div>
    );
  }

  const config = getChartOptions(chartData);

  return (
    <div className="w-full h-4">
      <h1 className="font-headings text-2xl mb-6">Bitcoin to EUR Chart</h1>
      <div className="flex justify-between text-slate-600 font-extrabold">
        <div className="flex items-center bg-gray-900 rounded-md p-1 text-xs">
          <button
            className="btn-primary hover:bg-slate-700"
            onClick={() => setChartData(data.prices)}
          >
            Price
          </button>
          <button
            className="btn-primary hover:bg-slate-700"
            onClick={() => setChartData(data.market_caps)}
          >
            Market Cap
          </button>
        </div>
        <div className="flex items-center bg-gray-900 rounded-md p-1 text-xs">
          <button
            className="btn-primary hover:bg-slate-700"
            onClick={() => setDays("1")}
          >
            1D
          </button>
          <button
            className="btn-primary hover:bg-slate-700"
            onClick={() => setDays("7")}
          >
            7D
          </button>
          <button
            className="btn-primary hover:bg-slate-700"
            onClick={() => setDays("90")}
          >
            3M
          </button>
          <button
            className="btn-primary hover:bg-slate-700"
            onClick={() => setDays("365")}
          >
            1Y
          </button>
          <button
            className="btn-primary hover:bg-slate-700"
            onClick={() => setDays("360")}
          >
            YTD
          </button>
          <button
            className="btn-primary hover:bg-slate-700"
            onClick={() => setDays("max")}
          >
            ALL
          </button>
        </div>
      </div>
      <ReactHighcharts config={config}></ReactHighcharts>
    </div>
  );
};
