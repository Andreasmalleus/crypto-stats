interface TableProps {
  header: JSX.IntrinsicElements["tr"];
  body: JSX.IntrinsicElements["tr"];
}

export const Table: React.FC<TableProps> = ({ header, body }) => {
  return (
    <table className="w-full m-auto border-collapse">
      <thead>{header}</thead>
      <tbody>{body}</tbody>
    </table>
  );
};
