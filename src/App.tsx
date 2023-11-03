import React, { useEffect, useRef, useState } from "react";
import { Table } from "./components/table/Table";
import "./App.css";
import axios from "axios";
import { Pagination } from "./components/pagination/Pagination";

export interface IAppRow {
  appId: string;
  appName: string;
  category: string;
  appSources: Array<string>;
}

function App() {
  const [data, setData] = useState({
    totalCount: null,
    appRows: [],
  });

  const prevPageNumber = useRef(1);

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
    setPagination((prevState) => ({
      ...prevState,
      pageNumber: 1,
    }));
    prevPageNumber.current = 1;
  }, [pagination.pageSize]);

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
        if (pagination.pageNumber > 1) {
          setPagination((prevState) => ({
            ...prevState,
            pageNumber: prevPageNumber?.current,
          }));
        }
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
        prevPageNumber={prevPageNumber}
      />
    </div>
  );
}

export default App;
