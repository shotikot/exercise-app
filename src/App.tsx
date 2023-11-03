import React, { useEffect, useState } from "react";
import { Table } from "./components/table/Table";
import "./App.css";
import axios from "axios";
import { Pagination } from "./components/pagination/Pagination";

function App() {
  const [data, setData] = useState({
    totalCount: null,
    appRows: [],
  });

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 25,
  });

  const changePage = (pageNumber: number) => {
    setPagination((prevState) => ({
      ...prevState,
      pageNumber,
    }));
  };

  const changePageSize = (pageSize: number) => {
    setPagination((prevState) => ({
      ...prevState,
      pageSize,
    }));
  };

  useEffect(() => {
    const getAppList = async () => {
      try {
        const response = await axios.put(
          "/api/v1/app-service/get-apps",
          pagination,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setData({
          totalCount: response.data.totalCount,
          appRows: response.data.appRows,
        });
      } catch (err) {
        console.error(err);
      }
    };

    getAppList();
  }, [pagination]);

  return (
    <div className="App">
      <Table columns={data.appRows} />
      <Pagination
        totalPages={
          data?.totalCount
            ? Math.ceil(data?.totalCount / pagination.pageSize)
            : 0
        }
        pageNumber={pagination.pageNumber}
        changePage={changePage}
        changePageSize={changePageSize}
        pageSize={pagination.pageSize}
      />
    </div>
  );
}

export default App;
