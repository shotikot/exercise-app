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
      <h1>App Inventory</h1>
      <table cellPadding={0} cellSpacing={0}>
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
