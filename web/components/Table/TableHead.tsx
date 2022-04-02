interface TableHeadProps {
  headers: string[];
}

export const TableHead: React.FC<TableHeadProps> = ({ headers }) => {
  return (
    <thead>
      <tr className="font-headings">
        {headers.map((header, index) => {
          if (index < 3) {
            return (
              <th key={header} className="table-header text-left">
                {header}
              </th>
            );
          }
          return (
            <th key={header} className="table-header">
              {header}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
