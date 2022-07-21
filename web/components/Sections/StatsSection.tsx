import { formatCurrency } from "../../utils/formatCurrency";
import { getColor } from "../../utils/getColor";

interface StatsSectionProps {
  name: string;
  symbol: string;
  price: number;
  percentChange1h: number;
  marketCap: number;
  marketCapDominance: number;
  fullyDilutedMarket_cap: number;
  volume24h: number;
  circulatinSupply: number;
  maxSupply: number;
  totalSupply: number;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  name,
  symbol,
  price,
  percentChange1h,
  marketCap,
  marketCapDominance,
  fullyDilutedMarket_cap,
  volume24h,
  circulatinSupply,
  maxSupply,
  totalSupply,
}) => {
  const calculatePercentageFromSupply = (
    maxSupply: number,
    circulatingSupply: number
  ) => {
    return (circulatingSupply / maxSupply) * 100;
  };
  const volumePercentage = calculatePercentageFromSupply(
    maxSupply,
    circulatinSupply
  );

  return (
    <section className="flex-col w-8/12">
      <div className="text-xs mb-2">
        {name} Price ({symbol})
      </div>
      <div className="flex items-center mb-2">
        <div className="text-4xl font-headings">€ {formatCurrency(price)}</div>
        <div
          className="text-xs ml-2 rounded p-1 px-2 text-white"
          style={{
            backgroundColor: getColor(percentChange1h),
          }}
        >
          {formatCurrency(percentChange1h)}%
        </div>
      </div>

      {/* statistics about the currency itself */}
      <div className="border-t-2 border-slate-100 flex justify-center">
        <Stat title="Market Cap" value={marketCap} />
        <Stat title="Market Cap Dominance" value={marketCapDominance} />
        <Stat title="Fully Diluted Market Cap" value={fullyDilutedMarket_cap} />
        <Stat title="Volume" value={volume24h} />
        {/* Stat column with more information */}

        <div className="mt-4 p-4">
          <div className="text-xs text-slate-600 mb-2">Circulating Supply</div>
          <div className="flex items-center text-xs mb-2 justify-between">
            <div className="text-xs">
              {formatCurrency(circulatinSupply)} {symbol}
            </div>
            <div className="text-xs">{volumePercentage.toFixed(0)}%</div>
          </div>
          <div className="h-1 rounded mb-5 relative bg-gray-200">
            <div
              className="block h-full relative bg-slate-600 rounded-tl-md rounded-bl-md"
              style={{
                width: `${volumePercentage}%`,
              }}
            ></div>
          </div>

          <div className="flex items-center">
            <div className="text-xs text-slate-600 mr-2">Max Supply:</div>
            <div className="text-xs">{formatCurrency(maxSupply)}</div>
          </div>
          <div className="flex items-center">
            <div className="text-xs text-slate-600 mr-2">Total Supply:</div>
            <div className="text-xs">{formatCurrency(totalSupply)}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat: React.FC<{ value: number; title: string }> = ({ value, title }) => {
  return (
    <div className="mt-4 border-r-2 border-slate-100 p-4">
      <div className="text-xs text-slate-600 mb-2">{title}</div>
      <div className="text-xs">€{formatCurrency(value)}</div>
    </div>
  );
};
