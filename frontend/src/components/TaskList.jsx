import React from "react";
import axios from "axios";

export default function TaskList({tasks, setTasks}){
    const toggleComplete = async (task) =>{
        const response = await axios.patch(`https://todo-mern-vw4o.onrender.com/todo/tasks/${task._id}`,{
            completed : !task.completed
        });
        setTasks(tasks.map(t => t._id === task._id ? response.data : t))
    };

    const deleteTask = async (id)=>{
        await axios.delete(`https://todo-mern-vw4o.onrender.com/todo/tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
    }
    return (
        <ul>
            {tasks.map(task => (
                <li key={task._id}>
                     <span
                     style={{
                        textDecoration : task.completed? 'line-through' : 'none', cursor : 'pointer'
                     }}
                     onClick = {()=> toggleComplete(task)}
                    >{task.title}</span>

                    <button onClick={() => deleteTask(task._id)}>Delete</button>
                </li>
            ))}
        </ul>
    )
}