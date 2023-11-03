import React from "react";
import './TableRow.css';

interface ITableRows {
  appId: string;
  appName: string;
  category: string;
  appSources: Array<string>;
}

export const TableRow: React.FC<ITableRows> = ({
  appId,
  appName,
  category,
  appSources,
}) => {
  return (
    <tr>
      <td>{appId}</td>
      <td>{appName}</td>
      <td>{category}</td>
      <td>{appSources.map((appSource) => `${appSource}, `)}</td>
    </tr>
  );
};
