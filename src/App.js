import "./App.css";
import { useEffect, useState } from "react";
import Tile from "./components/Tile";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Button, Container, Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
function App() {
  let [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data.forEach((e) => {
          arr.push(e);
          console.log(e.name);
        });
        setData(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const mystyle = {
    width: "90%",
    padding: "10px",
    margin: "5px",
  };

  function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
    return (
      <>
        <Items currentItems={currentItems} />
        {/* <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        /> */}
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div>
              <h3>Item #{item.id}</h3>
            </div>
          ))}
      </>
    );
  }
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search by name, email or role"
        style={mystyle}
      ></input>
      <Table border-top hover responsive>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return <Tile data={e} key={e.id} />;
          })}
        </tbody>
      </Table>
      <div>
        <Container fluid>
          <Row>
            <Col md={2}>
              <Button>Delete Selected</Button>
            </Col>
            <Col md={10}>Paginate</Col>
          </Row>
        </Container>
      </div>
      <PaginatedItems itemsPerPage={10} />,
    </div>
  );
}

export default App;
