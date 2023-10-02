import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import { useLocation } from 'react-router'
import { Icon, Table, Container } from 'semantic-ui-react'
// import TransactionHistory from './TransactionHistory'
import 'semantic-ui-css/semantic.min.css'
import '../styles/Transaction.css'
import Switch from '@mui/material/Switch';
import axios from "axios";
import Button from "@mui/material/Button";

function Users(props) {
  console.log(props.data);
  const item = props.data.data;
  const [checked, setChecked] = React.useState(item.enable);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleEnable = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    const sendData = {
      userId: item.userId,
      enable: checked
    }
    try {
      const res = await axios.post("http://localhost:8090/admin/userEnable", sendData, config);
      if (res.status === 200) {
        console.log("finish api call - response:::", res.data);
      } else {
        console.log("Token get Failed");
      }
    } catch (error) {
      console.log("something wrong with token:::", error);
    };
  };

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
            <Table.Cell>{item.lastName}</Table.Cell>
            <Table.Cell>{item.email}</Table.Cell>
            <Table.Cell>{item.phone}</Table.Cell>
            <Table.Cell>{item.roles}</Table.Cell>
            {checked ? <Table.Cell positive>{<Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />}</Table.Cell>
              : <Table.Cell negative>{<Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />}</Table.Cell>}
          </Table.Row>
        </Table.Body>
      </Table>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        color="error"
        onClick={handleEnable}
      >
        Save Changes
      </Button>
    </Container>
  )
}

export default Users