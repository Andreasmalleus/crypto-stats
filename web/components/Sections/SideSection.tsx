import { formatCurrency } from "../../utils/formatCurrency";
import { formatPercentageToTwoDecimalPlaces } from "../../utils/formatPercentage";
import { getColor } from "../../utils/getColor";

interface SideSectionProps {
  name: string;
  symbol: string;
  price: number;
  percentChange24h: number;
  volume24h: number;
  volumeChange24h: number;
  rank: number;
  marketCap: number;
  dominance: number;
  dilutedValue: number;
}

export const SideSection: React.FC<SideSectionProps> = ({
  name,
  symbol,
  price,
  percentChange24h,
  volume24h,
  volumeChange24h,
  rank,
  marketCap,
  dominance,
  dilutedValue,
}) => {
  return (
    <div className="w-4/12 ml-10">
      <h1 className="font-headings text-2xl mb-6">{symbol} price statistics</h1>
      <div className="text-xs pb-2 border-b-2 border-slate-100">
        Bitcoin Price Today
      </div>
      <div className="flex justify-between py-4 border-b-2 border-slate-100">
        <div className="text-sm text-slate-500">Bitcoin Price</div>
        <div className="font-headings text-sm">€{formatCurrency(price)}</div>
      </div>
      <div className="flex items-center justify-between py-4 border-b-2 border-slate-100">
        <div className="flex items-center text-slate-500 p">
          <div className="text-sm mr-1">Price Change</div>
          <div className="text-xs bg-slate-100 p-1 rounded">24h</div>
        </div>
        <div className="flex-col">
          <div className="text-sm">
            €{formatCurrency(percentChange24h * price)}
          </div>
          <div
            className="text-right text-xs font-headings"
            style={{ color: getColor(percentChange24h) }}
          >
            {formatPercentageToTwoDecimalPlaces(percentChange24h)}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-4 border-b-2 border-slate-100">
        <div className="flex items-center text-slate-500 p">
          <div className="text-sm mr-1">Trading Volume</div>
          <div className="text-xs bg-slate-100 p-1 rounded">24h</div>
        </div>
        <div className="flex-col">
          <div className="text-sm">€{formatCurrency(volume24h)}</div>
          <div
            className="text-right text-xs font-headings"
            style={{ color: getColor(volumeChange24h) }}
          >
            {formatPercentageToTwoDecimalPlaces(volumeChange24h)}
          </div>
        </div>
      </div>
      <div className="flex justify-between py-4 border-b-2 border-slate-100 mb-10">
        <div className="text-sm text-slate-500">Market Rank</div>
        <div className="text-sm">#{rank}</div>
      </div>
      <div className="text-xs pb-2 border-b-2 border-slate-100">
        {name} Market Cap
      </div>
      <div className="flex justify-between py-4 border-b-2 border-slate-100">
        <div className="text-sm text-slate-500">Market Cap</div>
        <div className="font-headings text-sm">
          €{formatCurrency(marketCap)}
        </div>
      </div>
      <div className="flex justify-between py-4 border-b-2 border-slate-100">
        <div className="text-sm text-slate-500">Market Cap Dominance</div>
        <div className="text-sm">€{formatCurrency(dominance)}</div>
      </div>
      <div className="flex justify-between py-4 border-b-2 border-slate-100">
        <div className="text-sm text-slate-500">Fully Diluted Market Cap</div>
        <div className="text-sm">€{formatCurrency(dilutedValue)}</div>
      </div>
    </div>
  );
};
