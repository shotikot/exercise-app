import React from "react";
import { TableRow } from "./table-row/TableRow";
import './Table.css';

interface ITableProps {
  columns: Array<{
    appId: string;
    appName: string;
    category: string;
    appSources: Array<string>;
  }>;
}

export const Table: React.FC<ITableProps> = ({ columns }) => {
  return (
    <div>
      <h1>Table</h1>
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
