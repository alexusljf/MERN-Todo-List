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

const Record = (props) => (
 <TableRow>
   <TableCell>{props.record.task}</TableCell>
   <TableCell>{new Date(props.record.dueDate).toLocaleDateString() + ' ' + new Date(props.record.dueDate).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit" })}</TableCell>
   <TableCell>{new Date(props.record.dateAdded).toLocaleDateString() + ' ' + new Date(props.record.dateAdded).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit" })}</TableCell>
   <TableCell>
    <ButtonGroup>
      <IconButton href={`/edit/${props.record._id}`}>
        <EditIcon />
      </IconButton>
      <IconButton onClick = {() => {props.deleteRecord(props.record._id)}}>
        <DeleteIcon />
      </IconButton>
    </ButtonGroup>
   </TableCell>
 </TableRow>
);
export default function RecordList() {
 const [records, setRecords] = useState([]); // This array will contain the records from the database
  // This method fetches the records from the database.
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
  // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/record/${id}`, {
     method: "DELETE"
   });
   // filter the array of records to remove the one with the given id
    const newRecords = records.filter((record) => record._id !== id);
   setRecords(newRecords);
 }
  // This method will map out the records on the table
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
  // This following section will display the table with the records of individuals.
 return (
  <Box sx={{width: "auto"}}>
      <Typography variant="h3" gutterBottom>
        Todo List
      </Typography>
    <TableContainer>
     <Table>
       <TableHead>
         <TableRow>
           <TableCell>Task</TableCell>
           <TableCell>Due Date</TableCell>
           <TableCell>Date Added</TableCell>
           <TableCell>Actions</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>{recordList()}</TableBody>
     </Table >
     </TableContainer>
   </Box>
 );
}