import { exchanges } from "../data";
import Image from "next/image";
import { formatCurrency } from "../utils/formatCurrency";

export const ExchangesList: React.FC = () => {
  return (
    <table className="w-full m-auto border-collapse">
      <thead>
        <tr className="font-headings">
          <th className="table-header text-left">#</th>
          <th className="table-header text-left">Name</th>
          <th className="table-header">Score</th>
          <th className="table-header">Volume(BTC)</th>
          <th className="table-header">Country</th>
          <th className="table-header">Year Established</th>
        </tr>
      </thead>
      <tbody className="border-b-2 border-slate-100">
        {exchanges.map((exchange, index) => (
          <tr
            key={exchange.id}
            className="border-b-2 border-slate-100 transition duration-250 hover:bg-slate-100"
          >
            <th className="table-entry text-left py-5">{index + 1}</th>
            <th className="table-entry text-left">
              <div className="flex items-center cursor-pointer">
                <Image
                  src={exchange.image}
                  alt=""
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span className="ml-2">{exchange.name}</span>
              </div>
            </th>
            <th className="table-entry">{exchange.trust_score}</th>
            <th className="table-entry">
              {formatCurrency(exchange.trade_volume_24h_btc)}
            </th>
            <th className="table-entry">
              {exchange.country ? exchange.country : "not known"}
            </th>
            <th className="table-entry">
              {exchange.year_established
                ? exchange.year_established
                : "not known"}
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
