import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';

 export default function Edit() {
 const [form, setForm] = useState({
    task: "",
    dueDate: "",
    records: [],
 });
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
       navigate("/");
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
   const editedTask = {
    task: form.task,
    dueDate: form.dueDate,
   };
    // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedTask),
     headers: {
       'Content-Type': 'application/json'
     },
   });
    navigate("/");
 }
  // This following section will display the form that takes input from the user to update the data.
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
   <div>
     <h3>Update Task</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name" style ={{display: 'block'}}>Task</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.task}
           onChange={(e) => updateForm({ task: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position" style ={{display: 'block'}}>Due Date</label>
         <DateTimePicker 
            name="startDateTime" 
            value={form.dueDate}
            onChange={(newValue) => updateForm({ dueDate: newValue })}
        />
       </div>
       <div className="form-group">
        <Button variant="contained" style ={{marginTop: "10px"}} type="submit">Create Task</Button>
       </div>
     </form>
   </div>
   </LocalizationProvider>
 );
}