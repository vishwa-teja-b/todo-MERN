import React, {useEffect, useState} from 'react'
import './App.css'
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Tasks:", tasks);
  useEffect(()=>{
    fetchTasks();
    
    if(loading){
      console.log("Loading tasks...");
    }
  },[])

  async function fetchTasks(){
    try{
      const response = await axios.get('https://todo-mern-vw4o.onrender.com/todo/tasks');
      const data = response.data;

      if(!data){
        alert("No tasks found");
        throw new Error("No tasks found");
      }else{
        setTasks(data);
        setLoading(false);
      }

    }catch(error){
      console.log("Error fetching tasks:", error);
      setLoading(false);
    }
  }

  if(loading){
    return <div>Loading tasks...</div>
  }

  return (
    <div>
    <h1>TODO LIST APP </h1>
    <TaskForm onTaskAdd = {task => setTasks([...tasks, task])}></TaskForm>
    <TaskList tasks = {tasks} setTasks = {setTasks}></TaskList>
    </div>
  )
}

export default App;
