import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adddata } from "./ContextProvider"

export default function AddUser() {

    let navigate = useNavigate();

    const [userdata,setUserdata] = useContext(adddata)

    const [user,setUser]=useState({
        userName:"",
        name:"",
        email:""
    });

    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
        console.log(user);
    };

    const addUserData = async(e)=>{

        e.preventDefault();
        const {userName, name, email} = user;
        const res = await fetch("http://localhost:8003/adduser",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                userName, name, email
            })
        });

        const data = await res.json();
        console.log(data);

        if(res.status === 404 || !data){
            alert("error");
            console.log("error ");
        }
        else{
            alert("data added");
            console.log("data added");
            setUserdata(data);
            navigate("/");
        }
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded shadow p-4 mt-2">
                <h2 className="text-center m-4">Register User</h2>
                <form>
                <div className="mb-3">
                    <label htmlFor="UserName" className="form-lable">
                        User Name
                    </label>
                    <input
                    type={"text"}
                    className='form-control'
                    placeholder="Please enter your user name"
                    name="userName"
                    value={user.userName}
                    onChange={onInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-lable">
                        Name
                    </label>
                    <input
                    type={"text"}
                    className='form-control'
                    placeholder="Please enter your name"
                    name="name"
                    value={user.name}
                    onChange={onInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-lable">
                        E-mail
                    </label>
                    <input
                    type={"text"}
                    className='form-control'
                    placeholder="Please enter your E-mail address"
                    name="email"
                    value={user.email}
                    onChange={onInputChange}/>
                </div>
                <button type="submit" to="/" onClick={addUserData} className="btn btn-outline-primary">Submit</button>
                <Link to="/" className="btn btn-outline-danger mx-2">Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
