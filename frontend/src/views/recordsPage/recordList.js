import React, { useEffect, useState } from "react";
import { IconButton, Button, ButtonGroup } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './recordList.scss';

const Record = (props) => (
  <TableRow id={`row-${props.record._id}`}> 
    <TableCell>{props.record.task}</TableCell>
    <TableCell>{new Date(props.record.dueDate).toLocaleDateString() + ' ' + new Date(props.record.dueDate).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit" })}</TableCell>
    <TableCell>{new Date(props.record.dateAdded).toLocaleDateString() + ' ' + new Date(props.record.dateAdded).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit" })}</TableCell>
    <TableCell id={`countdown-${props.record._id}`}>Loading...</TableCell>
    <TableCell>
      <ButtonGroup>
        <IconButton href={`/edit/${props.record._id}`}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => { props.deleteRecord(props.record._id) }}>
          <DeleteIcon />
        </IconButton>
      </ButtonGroup>
    </TableCell>
  </TableRow>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/record/${id}`, {
      method: "DELETE"
    });
    const newRecords = records.filter((record) => record._id !== id);
    setRecords(newRecords);
  }

  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // useEffect to update the countdown timer
  useEffect(() => {
    records.forEach(record => {
      const targetDate = new Date(record.dueDate).getTime();
      const countdownElement = document.getElementById(`countdown-${record._id}`);
      const rowElement = document.getElementById(`row-${record._id}`);

      function updateCountdown() {
        const currentTime = new Date().getTime();
        const timeDifference = targetDate - currentTime;

        if (timeDifference <= 0) {
          countdownElement.innerText = "Time's up!";
          rowElement.style.color = "red";
          rowElement.style.backgroundColor = "#ffe6e6";
        } else {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

          countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
      }

      setInterval(updateCountdown, 1000);
      updateCountdown(); // Initial update
    });
  }, [records]);

  return (
    <Box sx={{ width: "auto" }}>
      <Typography variant="h3" gutterBottom className="title">
        Todo List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Date Added</TableCell>
              <TableCell>Time Left</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{recordList()}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
