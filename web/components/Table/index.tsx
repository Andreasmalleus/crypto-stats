import { TableHead } from "./TableHead";

interface TableProps {
  children: React.ReactNode;
  headers: string[];
}

export const Table: React.FC<TableProps> = ({ children, headers }) => {
  return (
    <table className="w-full m-auto border-collapse">
      <TableHead headers={headers} />
      <tbody className="border-b-2 border-slate-100">{children}</tbody>
    </table>
  );
};
