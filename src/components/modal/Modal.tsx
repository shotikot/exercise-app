import React, { useEffect, useState } from "react";
import axios from "axios";
import { IAppRow } from "../../App";
import "./Modal.css";

interface IModalProps extends IAppRow {
  onClose: () => void;
}

export const Modal: React.FC<IModalProps> = ({
  onClose,
  appId,
  appName,
  appSources,
  category,
}) => {
  const [users, setUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/v1/app-service/get-app-overview-users/${appId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );

        setUsers(response.data.appUsers);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    getUsers();
  }, [appId]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(ev) => ev.stopPropagation()}>
        <h3>App Overview</h3>
        <p>App Name: {appName}</p>
        <p>Category: {category}</p>
        <p>Connector: {appSources.map((appSource: string) => appSource)}</p>
        <div>
          <h3>Users</h3>
          {loading ? (
            <span>Loading...</span>
          ) : (
            users.map((user) => <p key={user}>{user}</p>)
          )}
        </div>
      </div>
    </div>
  );
};
