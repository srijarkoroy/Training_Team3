import React from 'react'
import {Link, useLocation} from 'react-router-dom'
// import { useLocation } from 'react-router'
import { Icon, Table, Container } from 'semantic-ui-react'
// import TransactionHistory from './TransactionHistory'
import 'semantic-ui-css/semantic.min.css'
import '../styles/Transaction.css'
import { useTransaction } from './TransactionContext'

function Transaction() {
    // console.log(props.location.state);
    // const location = useLocation();
    // console.log(location.search);
    // const propsData = location.state;
    // console.log(propsData);

    const {transactionData} = useTransaction();
    console.log(transactionData);

    return (
  <Container> 
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Transaction ID</Table.HeaderCell>
        <Table.HeaderCell>Sender Account Number</Table.HeaderCell>
        <Table.HeaderCell>Recipient Acccount Number</Table.HeaderCell>
        <Table.HeaderCell>Amount</Table.HeaderCell>
        <Table.HeaderCell>Timestamp</Table.HeaderCell>
        <Table.HeaderCell>Statement</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>{transactionData}</Table.Cell>
        <Table.Cell>Unknown</Table.Cell>
        <Table.Cell negative>None</Table.Cell>
        <Table.Cell>Jimmy</Table.Cell>
        <Table.Cell positive>
          <Icon name='checkmark' />
          Approved
        </Table.Cell>
        <Table.Cell>None</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  </Container> 
    )
}

export default Transaction