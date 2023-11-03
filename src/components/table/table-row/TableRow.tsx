import React, { useState } from "react";
import { Modal } from "../../modal/Modal";
import { IAppRow } from "../../../App";
import "./TableRow.css";

export const TableRow: React.FC<IAppRow> = ({
  appId,
  appName,
  category,
  appSources,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <tr onClick={() => setIsOpen(true)}>
        <td>{appId}</td>
        <td>{appName}</td>
        <td>{category}</td>
        <td>{appSources.map((appSource) => `${appSource}, `)}</td>
      </tr>
      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          appId={appId}
          appName={appName}
          category={category}
          appSources={appSources}
        />
      )}
    </>
  );
};
