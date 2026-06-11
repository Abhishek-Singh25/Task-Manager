import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "./api";
import "./login.css";

function Login(){
    const navigate=useNavigate();
    const [formdata,setFormdata]=useState({email:"", password:""});
    
    function handleChange(e){
        setFormdata({...formdata,[e.target.name]:e.target.value});
    }
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const res=await API.post('/auth/login', formdata);

            localStorage.setItem('token',res.data.token);
            localStorage.setItem('name',res.data.user.name);

            alert("Login Successful");
            navigate('/dashboard');
        }
        catch(error){
            alert("Login Failed");
        }
    }
    return(
        <div className="main-container">
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account ? {" "}
                <Link to='/register'>Register here</Link>
            </p>
        </div>
        </div>
    );
}

export default Login;