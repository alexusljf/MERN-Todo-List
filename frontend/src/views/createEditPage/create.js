import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import './createEdit.scss';
import { Grid } from "@mui/material";

export default function Create() {
 const [form, setForm] = useState({
   task: "",
   dueDate: "",
   dateAdded: "",
 });
const [dueDateError, setDueDateError] = useState(false);
const [taskError, setTaskError] = useState(false); 

 const curDate = dayjs(); // This will get the current date.
 const navigate = useNavigate();
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    setTaskError(false);
    setDueDateError(false);
    if(form.task === "") {
      setTaskError(true);
    }
    if(form.dueDate === "") {
      setDueDateError(true);
    }

    if(form.task && form.dueDate){
      const dateAdded = new Date().toISOString();
      const newTask = {
        task: form.task,
        dueDate: form.dueDate,
        dateAdded: dateAdded,
       };
       console.log("Adding new task:" + form.task + " " + form.dueDate + " " + dateAdded);
      await fetch("http://localhost:5000/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
      // Do not reset the form state here
      navigate("/list");
    }
  }
  // This following section will display the form that takes the input from the user.
 return (
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
  <Box className = "createMain"> 
    <Box className = "createContainer" sx={{width: "auto"}}>
      <Typography variant='h3' gutterBottom>
          Create New Task
      </Typography>
      <form onSubmit={onSubmit} autoComplete="on" >
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
                variant="outlined"
                onChange={(e) => updateForm({ task: e.target.value })}
                label="Task"
                error={taskError}
                helperText={taskError ? "Task cannot be empty" : ""}
                fullWidth
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
                error={dueDateError}
                label="Due Date"
                helperText={dueDateError ? "Due date cannot be empty" : ""}
                fullWidth
            />
        </Grid>
    </Grid>
    <br />
        <Button 
          variant="contained" 
          startIcon={<SendIcon />}
          type="submit">
          Create Task
        </Button>
      </form>
    </Box>
  </Box>

   </LocalizationProvider>
 );
}