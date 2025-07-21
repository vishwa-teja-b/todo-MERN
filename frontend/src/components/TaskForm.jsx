import axios from 'axios';
import React, { useState } from 'react';



export default function TaskForm(props){
    const { onTaskAdd } = props;
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);


    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(!title){
            alert("Title is required");
            return;
        }

        try{
            const requestBody = await axios.post('https://todo-mern-vw4o.onrender.com/todo/tasks',{
                title,
                completed
            })
            onTaskAdd(requestBody.data);
            // Reset the form fields
            setTitle("");
            setCompleted(false);
            alert("Task created successfully");
            console.log("Task created successfully:", requestBody.data);
        }catch(error){
            console.error("Error creating task:", error);
            alert("Error creating task");
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
            placeholder = "Enter task"
            value={title}
            onChange = {(event)=> setTitle(event.target.value)}
            />

            <button type="submit">Add</button>
        </form>
    )
}