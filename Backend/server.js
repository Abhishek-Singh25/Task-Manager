const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();
const authroutes=require('./routes/authRoutes');
const taskroutes=require('./routes/taskRoutes');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use('/api/auth', authroutes);
app.use('/api/tasks', taskroutes);

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});