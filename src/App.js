import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
function App() {
  let [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://mocki.io/v1/d89056c3-1529-4bca-b85f-4d82457ee3bd")
      .then((res) => res.json())
      .then((res) => {
        let data = res.data;
        let arr = [];
        data.forEach((e) => {
          arr.push(e);
          // console.log(e.name);
        });
        setData(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Layout data={data} setData={setData} />
    </>
  );
}

export default App;
