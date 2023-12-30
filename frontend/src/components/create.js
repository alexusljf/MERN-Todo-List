import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';


export default function Create() {
 const [form, setForm] = useState({
   task: "",
   dueDate: "",
 });
 const navigate = useNavigate();
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  // This function will handle the submission.
 async function onSubmit(e) {
    console.log(form);
    console.log("submit btn pressed")
   e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
   const newTask = { ...form };
    await fetch("http://localhost:5000/record/add", {
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
    setForm({ task: "", dueDate: "" });
   navigate("/list");
 }
  // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Task</h3>
     <form onSubmit={onSubmit}>
     <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ task: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Position</label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.position}
           onChange={(e) => updateForm({ dueDate: e.target.value })}
         />
       </div>
       <div className="form-group">
        <Button variant="contained" style ={{marginTop: "10px"}} type="submit">Create Task</Button>
       </div>
     </form>
   </div>
 );
}