import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { fetchUsers } from "./services/fetchData";
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchUsers(setData);
  }, []);
  return (
    <>
      <Layout data={data} setData={setData} />
    </>
  );
}

export default App;
