import React from "react";
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

function TablePublic(props) {
  return (
    <Table className="tableclass" striped bordered hover size="sm" responsive>
   
    <tbody>
       <tr>
        <td>UID</td>
        <td>{props.uid}</td>
      </tr>
      <tr>
        <td>Asset No</td>
        <td>{props.assetNo}</td>
      </tr>
      <tr>
        <td>Equipment Type</td>
        <td>{props.equipType}</td>
      </tr>
      <tr>
        <td>Name Of Equipment</td>
        <td>{props.nameEquip}</td>
      </tr>
      <tr>
        <td>Specification/Configuration</td>
        <td>{props.specsConfig}</td>
      </tr>
      <tr>
        <td>Make</td>
        <td>{props.make}</td>
      </tr>
      <tr>
        <td>Date Of Purchase</td>
        <td>{props.dop}</td>
      </tr>
      <tr>
        <td>Warranty</td>
        <td>{props.warranty}</td>
      </tr>
      <tr>
        <td>Supplier</td>
        <td>{props.supplier}</td>
      </tr>
    </tbody>
  </Table>
  );
}

export default TablePublic;