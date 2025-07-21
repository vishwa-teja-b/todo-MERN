const Task = require("../models/Task");

// logic to get all tasks from database
exports.getTasks = async (req, res)=>{
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);

    }catch(error){
        res.status(500).json({
            message : "Error fetching tasks"
        })
    }
}

// logic to get a single task by ID

exports.getTasksById = async (req, res)=>{
    const task = await Task.findById(req.params.id);
    if(!task){
        return res.status(404).json({
            message : "Task not found"
        })
    }

    res.status(200).json(task);
}


// logic to create a new task

exports.createTask = async (req, res)=>{
    const {title, completed} = req.body;

    if(!title){
        return res.status(400).json({
            message : "Title is required"
        })
    }

    try{
       const task = new Task({ title, completed });

        await task.save();
        res.status(201).json(task);
    }catch(error){
        res.status(500).json({
            message : "Error creating task"
        })
    }
}

// logic to update a task by Id

exports.updateTask = async (req, res)=>{
    const task = await Task.findById(req.params.id);

    if(!task){
        return res.status(404).json({
            message : "Task not found"
        })
    }

    const {title, completed} = req.body;
    if(!title){
        return res.status(400).json({
            message : "Title is required"
        })
    }

    task.title = title;
    task.completed = completed;

    await task.save();
    res.status(200).json(task);
}

// logic to update a task partially

exports.updateTaskPartially = async (req, res)=>{
    const task = await Task.findById(req.params.id);
    if(!task){
        return res.status(404).json({
            message : "Task not found"
        })
    }

    if(!req.body.title && req.body.completed === undefined){
        return res.status(400).json({
            message : "Title or completed status is required"
        })
    }
    // Update only the fields that are provided in the request body
    // This allows partial updates
    const {title, completed} = req.body;

    if(title){
        task.title = title;
    }
    if(completed !== undefined){
        task.completed = completed;
    }

    await task.save();
    res.status(200).json(task);


}
// logic to delete a task by Id

exports.deleteTask = async (req, res)=>{

    if(!req.params.id){
        return res.status(400).json({
            message : "Task ID is required"
        })
    }

    const task = await Task.findById(req.params.id);
    if(!task){
        return res.status(404).json({
            message : "Task not found"
        })
    }
   await Task.findByIdAndDelete(req.params.id);
   res.status(200).json({
    message : "Task deleted successfully"
   })
}