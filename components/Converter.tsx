import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

interface ConverterProps {
  logo: string;
  symbol: string;
  name: string;
}

export const Converter: React.FC<ConverterProps> = ({ logo, symbol, name }) => {
  const [base, setBase] = useState(1);
  const [target, setTarget] = useState(0);
  const [isSwitched, setIsSwitched] = useState(false);

  const toggleSwitch = () => {
    setIsSwitched(!isSwitched);
  };

  return (
    <div>
      <h1 className="font-headings text-md mt-2 mb-4">
        {symbol} TO EUR Converter
      </h1>
      <div className="flex items-center w-full rounded-xl border border-slate-200 relative">
        <div className="w-1/2 flex justify-between items-center p-4">
          <Currency
            logo={
              isSwitched
                ? "https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/EUR.svg"
                : logo
            }
            name={isSwitched ? "Euro" : name}
            symbol={isSwitched ? "EUR" : symbol}
            value={isSwitched ? target : base}
            setValue={isSwitched ? setTarget : setBase}
          />
        </div>

        <div
          className="cursor-pointer absolute left-1/2 tranform -translate-x-1/2 m-0 p-0"
          onClick={() => toggleSwitch()}
        >
          <img src="/icons/swap-horizontal.svg" width={20} height={20} />
        </div>
        <div className="w-1/2 flex justify-between items-center p-4 bg-slate-100 rounded-tr-xl rounded-br-xl">
          <Currency
            logo={
              !isSwitched
                ? "https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/EUR.svg"
                : logo
            }
            name={!isSwitched ? "Euro" : name}
            symbol={!isSwitched ? "EUR" : symbol}
            value={!isSwitched ? target : base}
            setValue={!isSwitched ? setTarget : setBase}
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
  value: number;
  style?: React.CSSProperties;
  setValue: Dispatch<SetStateAction<number>>;
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
        <Image src={logo} width={40} height={40} />
        <div className="flex-col text-xs ml-2">
          <div className="text-slate-500">{symbol}</div>
          <div>{name}</div>
        </div>
      </div>
      <input
        className="font-headings text-lg w-full text-right outline-none border-none"
        type="text"
        style={style}
        value={value}
        onChange={(e) => {
          setValue(parseFloat(e.target.value) || 0);
        }}
      />
    </>
  );
};
