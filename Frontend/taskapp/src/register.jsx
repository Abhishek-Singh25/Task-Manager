import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

function Register(){
    const navigate=useNavigate();
    const [formdata,setFormdata]=useState({name:"",email:"",password:""});

    function handleChange(e){
        setFormdata({...formdata,[e.target.name]:e.target.value});
    }
    async function handleSubmit(e){
        e.preventDefault();
        try{
            await API.post('/auth/register',formdata);
            
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.user.name);
            
            alert("Registration Successful");
            navigate('/dashboard');
        }
        catch(error){
            alert("Registration Failed");
        }
    }
    return(
        <div className="main-container">
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formdata.name}
                onChange={handleChange}
                required
                />
                <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formdata.email}
                onChange={handleChange}
                required
                />
                <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={formdata.password}
                onChange={handleChange}
                required
                />
                <button type="submit">Create Account</button>
            </form>
        </div>
        </div>
    );
}

export default Register;
