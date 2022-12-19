import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
import { Button, Container, Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
export default function Layout(props) {
  console.log("props ", props);
  // let { data, setData } = props;
  let [currentItems, setCurrentItems] = useState([]);
  let [showEdit,setShowEdit] = useState(null);
  const [reload,setReload] = useState(false);
  let deleteItems = [];
  const mystyle = {
    width: "90%",
    padding: "10px",
    margin: "5px",
  };
  useEffect(() => {
    setCurrentItems(props.data);
  }, [props.data]);
  useEffect(()=>{

  },[currentItems,reload])

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log("currentData >> ",currentItems);
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    let CurrentItems = currentItems.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(currentItems.length / itemsPerPage);

    const handlePageClick = (event) => {
      console.log("hpc : >> ",event);
      // let li = document.getElementsByClassName("page-item");
      // for(const item of li){
      //   if(item.classList.contains('active')){
      //     item.classList.remove('active');
      //   }
      // }
      let as = document.getElementById("all-select");
      as.checked = false;
      const newOffset = (event.selected * itemsPerPage) % currentItems.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
    const handleMultipleDelete = () => {
      let checkboxes = document.getElementsByClassName('multi-checkboxes');
      let checked=[];
      for(let i=0;i<checkboxes.length;i++){
        if(checkboxes[i].checked)
          checked.push(checkboxes[i].value)
      }
      console.log("inside hmDelete");
      console.log("CI >>> ",checked);
      // deleteItems
      let allItems=[...currentItems];
      allItems = allItems.filter(val=>!checked.includes(val.id));
      console.log("allItems >> ",allItems);
      setCurrentItems(allItems);
    };
    const handleFirstPage=()=>{
      setReload(!reload)
    }
    const handleLastPage=()=>{
      let count = Math.ceil(currentItems.length/itemsPerPage);
      console.log(count);
      let li = document.getElementsByClassName("page-item");
      for(const item of li){
        if(item.classList.contains('active')){
          item.classList.remove('active');
        }
      }
      li[count].classList.add('active');
      let ul = document.getElementsByClassName('pagination')[0];
      console.log(ul);
      let lastChild = ul.children[ul.children.length-1];
      console.log(lastChild);
      lastChild.classList.add('disabled')
      // if(li[count+1]){
      //   li[count+1].classList.add('active');
      // }else{
      //   li[count].classList.add('active');
      // }
      handlePageClick({selected:count-1})
    }
    return (
      <>
        <Items currentItems={CurrentItems} />
        <Container fluid>
          <Row className="d-flex">
            <Col md={2}>
              {
              showEdit==null?
              <Button
                className="btn-danger"
                onClick={() => handleMultipleDelete()}
              >
                Delete Selected
              </Button>
              :
              <Button
                className="btn-danger disabled"
                onClick={() => handleMultipleDelete()}
              >
                Delete Selected
              </Button>
              }
            </Col>
            <Col md={4} className="align-self-center">
            <Row className="d-flex justify-content-center align-items-baseline">
              <Col md={1} sm={12}><img src={"https://cdn-icons-png.flaticon.com/512/70/70229.png"} width={"25px"} onClick={()=>handleFirstPage()}/></Col>
              <Col md={10} sm={12}>
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
              <Col md={1} sm={12}><img src={"https://cdn-icons-png.flaticon.com/512/70/70082.png"} width={"25px"} onClick={()=>handleLastPage()}/></Col>
              </Row>
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
          let id = document.getElementById(`chk-${e.id}`);
          id.checked = false;
          let tr = document.getElementById(`tr-${e.id}`);
          tr.classList.remove('highlight-row');
        });
        deleteItems = [];
        return;
      }
      console.log("inside handleMultipleSelect");
      currentItems.map((e) => {
        let id = document.getElementById(`chk-${e.id}`);
        id.checked = true;
        let tr = document.getElementById(`tr-${e.id}`);
        tr.classList.add('highlight-row');
      });
      deleteItems = [...currentItems];
      console.log(currentItems);
    };

    const handleDelete =(id)=>{
      let checkbox = document.getElementsByClassName("multi-checkboxes");
      let count=0;
      for(let i=0;i<checkbox.length;i++){
        if(checkbox[i].checked)
          count++;
      }
      console.log("count : ",count);
      if(count==1){
      let allItems = [...props.data];
      allItems=allItems.filter(item=>item.id != id);
      setCurrentItems(allItems);
      }else if(count>1){
        window.alert("Use Delete Selected for multi-Delete !")
      }else{
        window.alert("check an item to delete")
      }
    }
    const handleEdit=(id)=>{
      console.log("handleEdit >>> : ",id);
      setShowEdit(id);
    }
    const handleCancel = (id)=>{
      setShowEdit(null);
    }
    const editData=(arr,id,name,email,role)=>{

    }
    const handleSave=(id)=>{
      let name = document.getElementById("edit-name").value;
      let email = document.getElementById("edit-email").value;
      let role = document.getElementById("edit-role").value;
      console.log("inside hSave >> ",currentItems);
      let allItems=[...props.data];
      for(let i=0;i<allItems.length;i++){
        if(allItems[i].id==id){
          allItems[i].name=name===""?allItems[i].name:name;
          allItems[i].email=email===""?allItems[i].email:email;
          allItems[i].role=role===""?allItems[i].role:role;
        }
      };
      console.log("after edt >>> ",allItems);
      window.alert("Update Successfull");
      setShowEdit(null);
      setCurrentItems(allItems);
    }
    const handleToggleClass = (id)=>{
      let tr = document.getElementById(id);
      if(tr.classList.contains('highlight-row')){
        tr.classList.remove('highlight-row');
      }else{
        tr.classList.add('highlight-row');
      }

    }
    return (
      <>
        <input
          type="text"
          placeholder="Search by name, email or role"
          style={mystyle}
        ></input>
        <div>
        {showEdit!=null && props.data.map((data) => {
          {console.log("******* = "+data.id+" "+showEdit)}
          if(data.id===showEdit){
                    return <>
                            <Table border-top hover responsive>
          <thead>
            <tr>
              <th>Edit Name</th>
              <th>Edit Email</th>
              <th>Edit Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>

                  <td><input type="text" placeholder={data.name} id={"edit-name"} /></td>
                  <td><input type="text" placeholder={data.email} id={"edit-email"} /></td>
                  <td><input type="text" placeholder={data.role} id={"edit-role"} /></td>
                  <td>
                    <img
                      src={"https://cdn-icons-png.flaticon.com/512/2344/2344147.png"}
                      width={"40px"}
                      alt="save"
                      onClick={()=>{handleSave(data.id)}}
                    />
                    &nbsp;
                    <img
                      src={"https://cdn-icons-png.flaticon.com/512/391/391247.png"}
                      width={"40px"}
                      alt="cancel"
                      onClick={()=>{handleCancel(data.id)}}
                    />
                  </td>
                  </tr>
                  </tbody>
                  </Table>
                            </>
          }
                        })           
            }
        </div>
        {showEdit==null &&
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
            {currentItems.map((data) => {
              return <>
                  <tr id={`tr-${data.id}`}>
      <td>
        <input type="checkbox" id={`chk-${data.id}`} value={data.id} className="multi-checkboxes" onClick={()=>handleToggleClass(`tr-${data.id}`)} />
      </td>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{data.role}</td>
      <td>
        <img
          src={"https://cdn-icons-png.flaticon.com/512/2356/2356780.png"}
          width={"25px"}
          alt="edit"
          onClick={()=>{handleEdit(data.id)}}
        />
        &nbsp;
        <img
          src={"https://cdn-icons-png.flaticon.com/512/6861/6861362.png"}
          width={"25px"}
          alt="delete"
          onClick={()=>{handleDelete(data.id)}}
        />
      </td>
    </tr>
              </>
            })}
          </tbody>
        </Table>
  }
      </>
    );
  }
  return <>
    {showEdit==null?
    <div className="App">
      <PaginatedItems itemsPerPage={10} />
    </div>:<PaginatedItems itemsPerPage={"Edit"}/>
    }
  </>
}
