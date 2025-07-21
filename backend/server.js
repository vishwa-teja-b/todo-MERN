const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require("./routes/taskRoutes");
// const { connect } = require('mongoose');

require('dotenv').config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/todo",taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})