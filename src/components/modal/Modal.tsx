import React, { useEffect, useState } from "react";
import axios from "axios";
import { IAppRow } from "../../App";
import "./Modal.css";

axios.defaults.headers.common["ngrok-skip-browser-warning"] = "69420";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `/api/v1/app-service/get-app-overview-users/${appId}`
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
        <div className="overview">
          <p>App Name: {appName}</p>
          <p>Category: {category}</p>
          <p>Connector: {appSources.map((appSource: string) => appSource)}</p>
        </div>
        {!loading && users.length > 0 && (
          <div className="users">
            <div className="title">
              <span>Username</span>
            </div>
            {users.map((user) => (
              <div key={user} className="user">
                <span>{user}</span>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div className="loader">
            <h3>Loading...</h3>
          </div>
        )}

        {!loading && users.length === 0 && (
          <div className="loader">
            <h3>No Users Found</h3>
          </div>
        )}
      </div>
    </div>
  );
};
