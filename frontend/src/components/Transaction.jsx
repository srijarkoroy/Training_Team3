import React from 'react'
import { Icon, Table, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../styles/Transaction.css' 

function Transaction(props) {
    console.log(props.data);
    console.log("Acc::: ",props.accNo);

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
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {props.data.data.map((item, index) => (
      <Table.Row>
        <Table.Cell>{item.transactionId}</Table.Cell>
        <Table.Cell>{item.senderAccNo}</Table.Cell>
        <Table.Cell>{item.recipientAccNo}</Table.Cell>
        {item.senderAccNo == props.accNo ? <Table.Cell negative>{item.amount}</Table.Cell> : <Table.Cell positive>{item.amount}</Table.Cell>}
        <Table.Cell>{item.timestamp}</Table.Cell>
        <Table.Cell>{item.statement}</Table.Cell>
      </Table.Row>
      ))}
    </Table.Body>
  </Table>
  </Container> 
    )
}

export default Transaction