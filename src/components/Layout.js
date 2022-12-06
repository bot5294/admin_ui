import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import Tile from "./Tile";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Button, Container, Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
export default function Layout(props) {
  console.log("props ", props);
  let { data, setData } = props;
  let [currentItems, setCurrentItems] = useState([]);
  let deleteItems = [];
  const mystyle = {
    width: "90%",
    padding: "10px",
    margin: "5px",
  };
  useEffect(() => {}, [currentItems]);

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(data);
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    let CurrentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const handlePageClick = (event) => {
      let as = document.getElementById("all-select");
      as.checked = false;
      const newOffset = (event.selected * itemsPerPage) % data.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
    const handleMultipleDelete = (cI) => {
      console.log("inside hmDelete");
      deleteItems.forEach((e) => {
        cI.filter((f) => f.id !== e.id);
      });
      setCurrentItems(cI);
    };
    return (
      <>
        <Items currentItems={CurrentItems} />
        <Container fluid>
          <Row className="d-flex justify-content-center">
            <Col md={2}>
              <Button
                className="btn-danger"
                onClick={() => handleMultipleDelete(CurrentItems)}
              >
                Delete Selected
              </Button>
            </Col>
            <Col md={10} className="align-self-center">
              <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakLabel="..."
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                containerClassName={"pagination"}
                activeClassName={"active"}
                renderOnZeroPageCount={null}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  function Items({ currentItems }) {
    const handleAllSelect = () => {
      let as = document.getElementById("all-select");
      console.log("value = ", as.value);
      if (as.checked == false) {
        currentItems.map((e) => {
          let id = document.getElementById(e.id);
          id.checked = false;
        });
        deleteItems = [];
        return;
      }
      console.log("inside handleMultipleSelect");
      currentItems.map((e) => {
        let id = document.getElementById(e.id);
        id.checked = true;
      });
      deleteItems = [...currentItems];
      // setDeleteItems(currentItems);
      // setCurrentItems(currentItems);
      console.log(currentItems);
    };
    return (
      <>
        <input
          type="text"
          placeholder="Search by name, email or role"
          style={mystyle}
        ></input>
        <Table border-top hover responsive>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  id="all-select"
                  onChange={handleAllSelect}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((e) => {
              return <Tile data={e} key={e.id} />;
            })}
          </tbody>
        </Table>
      </>
    );
  }
  return (
    <div className="App">
      <PaginatedItems itemsPerPage={10} />
    </div>
  );
}
