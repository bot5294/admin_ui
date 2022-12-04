import React from "react";
export default function Tile(props) {
  let data = props.data;
  return (
    <tr>
      <td>
        <input type="checkbox" id={data.id} />
      </td>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{data.role}</td>
      <td>
        <img
          src={"https://cdn-icons-png.flaticon.com/512/2356/2356780.png"}
          width={"25px"}
          alt="edit"
        />
        &nbsp;
        <img
          src={"https://cdn-icons-png.flaticon.com/512/6861/6861362.png"}
          width={"25px"}
          alt="delete"
        />
      </td>
    </tr>
  );
}
