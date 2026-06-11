import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import "./dashboard.css";

function Dashboard(){
    const [tasks,setTasks]=useState([]);
    const [taskdata,setTaskdata]=useState({title:"",description:""});
    const [editingid,setEditingid]=useState(null);

    const userName=localStorage.getItem("name");

    const navigate=useNavigate();

    async function getTasks(){
        try{
            const res=await API.get('/tasks');
            setTasks(res.data);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getTasks();
    },[]);

    function handleChange(e){
        setTaskdata({...taskdata,[e.target.name]:e.target.value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            if(editingid){
                await API.put(`/tasks/${editingid}`,taskdata);
                setEditingid(null);
            }
            else{
                await API.post('/tasks',taskdata);
            }
            setTaskdata({title:"", description:""});
            getTasks();
        }
        catch(error){
            console.log(error);
        }
    }
    function editTask(task){
        setEditingid(task._id);
        setTaskdata({title:task.title, description:task.description});
    }
    async function deleteTask(id){
        try{
            await API.delete(`/tasks/${id}`);
            getTasks();
        }
        catch(error){
            console.log(error);
        }
    }
    async function toggleStatus(id){
        try{
            await API.patch(`/tasks/${id}/status`);
            getTasks();
        }
        catch(error){
            console.log(error);
        }
    }

    function handleLogout(){
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navigate('/');
    }
    return(
        <div className="containerd">
        <div className="header">
            <h2>Welcome {userName}</h2>
            <button onClick={handleLogout}>Logout</button>
            </div>
            <form className="write" onSubmit={handleSubmit}>
                <input
                type="text"
                name="title"
                placeholder="Enter Task Title"
                value={taskdata.title}
                onChange={handleChange}
                />
                <br/><br/>
                <textarea
                    name="description"
                    placeholder="Enter Description"
                    value={taskdata.description}
                    onChange={handleChange}
                    required
                />
                <br/>
                <button type="submit">
                    {editingid?"Update Task":"Add Task"}
                </button>
            </form>
            <hr/>
            <div className="result">
            {tasks.map((task)=>(
                <div key={task.id} style={{border:"1px solid gray",padding:"10px",marginBottom:"10px"}}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Status:{" "} {task.status}</p>
                    <button onClick={()=>editTask(task)}>Edit</button>
                    {" "}
                    <button onClick={()=>toggleStatus(task._id)}>Toggle Status</button>
                    {" "}
                    <button onClick={()=>deleteTask(task._id)}>Delete</button>
                </div>
            ))}
            </div>
        </div>
    );
}

export default Dashboard;