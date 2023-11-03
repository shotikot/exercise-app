import React from "react";
import { TableRow } from "./table-row/TableRow";
import { IAppRow } from "../../App";
import "./Table.css";

interface ITableProps {
  columns: Array<IAppRow>;
}

export const Table: React.FC<ITableProps> = ({ columns }) => {
  return (
    <div>
      <table>
        <tr>
          <th>App ID</th>
          <th>App Name</th>
          <th>Category</th>
          <th>Connector</th>
        </tr>
        {columns.map((column) => (
          <TableRow key={column.appId} {...column} />
        ))}
      </table>
    </div>
  );
};
