import React from 'react'
import {Link, useLocation} from 'react-router-dom'
// import { useLocation } from 'react-router'
import { Icon, Table, Container } from 'semantic-ui-react'
// import TransactionHistory from './TransactionHistory'
import 'semantic-ui-css/semantic.min.css'
import '../styles/Transaction.css'

function Users(props) {
    console.log(props.data);
    const item = props.data.data;

    return (
  <Container> 
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>User ID</Table.HeaderCell>
        <Table.HeaderCell>First Name</Table.HeaderCell>
        <Table.HeaderCell>Last Name</Table.HeaderCell>
        <Table.HeaderCell>E-Mail</Table.HeaderCell>
        <Table.HeaderCell>Phone</Table.HeaderCell>
        <Table.HeaderCell>Roles</Table.HeaderCell>
        <Table.HeaderCell>Enable</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>{item.userId}</Table.Cell>
        <Table.Cell>{item.firstName}</Table.Cell>
        <Table.Cell negative>{item.lastName}</Table.Cell>
        <Table.Cell>{item.email}</Table.Cell>
        <Table.Cell positive>{item.phone}</Table.Cell>
        <Table.Cell>{item.roles}</Table.Cell>
        <Table.Cell>{item.enable}</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  </Container> 
    )
}

export default Users