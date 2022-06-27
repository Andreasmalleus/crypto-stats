import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { fetchRoute } from "../utils/fetchRoute";
import { formatCurrency } from "../utils/formatCurrency";

interface ConverterProps {
  id: number;
  logo: string;
  symbol: string;
  name: string;
}

export const Converter: React.FC<ConverterProps> = ({
  id,
  logo,
  symbol,
  name,
}) => {
  const [base, setBase] = useState<number>(1);
  const [target, setTarget] = useState<string>("");

  const { data } = useSWR(
    `/api/convert?id=${id}&convertTo=EUR&amount=${base}`,
    fetchRoute
  );

  useEffect(() => {
    if (data != undefined) {
      let currency: number = data?.data?.quote["EUR"].price;
      let formattedCurrency: any = formatCurrency(currency);
      setTarget(formattedCurrency);
    }
  }, [data]);

  return (
    <div>
      <h1 className="font-headings text-md mt-2 mb-4">
        {symbol} TO EUR Converter
      </h1>
      <div className="flex items-center w-full rounded-xl border border-slate-200 relative">
        <div className="w-1/2 flex items-center p-4 justify-between">
          <Currency
            logo={logo}
            name={name}
            symbol={symbol}
            value={base}
            setValue={setBase}
          />
        </div>
        <div className="w-1/2 flex justify-between items-center p-4 bg-slate-100 rounded-tr-xl rounded-br-xl">
          <Currency
            logo={"/images/EUR.png"}
            name={"Euro"}
            symbol={"EUR"}
            value={target}
            setValue={setTarget}
            style={{ backgroundColor: "rgb(238,243,248)" }}
          />{" "}
        </div>
      </div>
    </div>
  );
};

interface CurrencyProps {
  logo: string;
  name: string;
  symbol: string;
  value: string | number;
  style?: React.CSSProperties;
  setValue: Dispatch<SetStateAction<any>>;
}

const Currency: React.FC<CurrencyProps> = ({
  logo,
  symbol,
  name,
  value,
  style,
  setValue,
}) => {
  return (
    <>
      <div className="flex items-center">
        <Image src={logo} width={30} height={30} />
        <div className="flex-col text-xs ml-2">
          <div className="text-slate-500">{symbol}</div>
          <div>{name}</div>
        </div>
      </div>
      <input
        className="font-headings text-lg text-right outline-none border-none"
        type="text"
        style={style}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </>
  );
};
