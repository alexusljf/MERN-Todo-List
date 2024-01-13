import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import Box from '@mui/material/Box';
import { Grid } from "@mui/material";

 export default function Edit() {
 const [form, setForm] = useState({
    task: "",
    dueDate: "",
    dateAdded: "",
    records: [],
 });
 const [dueDateError, setDueDateError] = useState(false);

 const curDate = dayjs(); // This will get the current date.
 const params = useParams();
 const navigate = useNavigate();
  
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
      if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
      const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/list");
       return;
     }
      setForm(record);
   }
    fetchData();
    return;
 }, [params.id, navigate]);

  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  async function onSubmit(e) {
    e.preventDefault();

    setDueDateError(false);

    if(form.dueDate === "") {
      setDueDateError(true);
    }

  if(form.task && form.dueDate){
   const dateAdded = new Date().toISOString();
   const editedTask = {
    task: form.task,
    dueDate: form.dueDate,
    dateAdded: dateAdded,
   };
    // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/record/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedTask),
     headers: {
       'Content-Type': 'application/json'
     },
   });
    navigate("/list");
 }
}
  // This following section will display the form that takes input from the user to update the data.
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
    <Box className = "createMain"> 
    <Box className = "createContainer" sx={{width: "auto"}}>
     <Typography variant='h3' gutterBottom>
        Update Task
      </Typography>
     <form onSubmit={onSubmit} autoComplete="on" >
     <Grid container spacing={2}>
      <Grid item xs={12}>
      <TextField
        id="task" 
        value={form.task || ''}
        variant = "outlined"
        onChange={(e) => updateForm({ task: e.target.value })}
        label="Task"
      />
      </Grid>
      <Grid item xs={12}>
      <DateTimePicker 
        sx={{ width: '250px' }}
        defaultValue={curDate}
        onChange={(newValue) => updateForm({ dueDate: newValue })}
        disablePast
        skipDisabled
        required
        error = {dueDateError}
        label="Due Date"
      />
      </Grid>
      </Grid>
      <br/>
      <Button 
        variant="contained" 
        startIcon={<AutorenewIcon />}
        type="submit">
        Update Task
      </Button>
     </form>
   </Box>
   </Box>

   </LocalizationProvider>
 );
}