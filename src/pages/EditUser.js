import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';

export const EditUser = () => {

    //const [getuserdata,setUserdata] = useState([]);
    //console.log(getuserdata);

    let navigate = useNavigate();

    const [user,setUser]=useState({
        userName:"",
        name:"",
        email:""
    });

    const onInputChange=(e)=>{
        // const {name, value} = e.target;
        // setUser((preval)=>{
        //     return {
        //         ...preval,
        //         [name]: value
        //     }
        // });
        console.log(e.target.value);
        setUser({...user,[e.target.name]:e.target.value});
        console.log(user);
    };

    const {id} = useParams("");
    
    //console.log(id);
    
    const getUsersData = async()=>{
    
        const res = await fetch(`http://localhost:8003/viewuser/${id}`,{
            method: "GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
    
        const data = await res.json();
        //console.log(data);
    
        if(res.status === 422 || !data){
            console.log("error ");
        }
        else{
          setUser(data);
          console.log(user);
        }
    }

    useEffect(()=>{
        getUsersData();
    },[]);

    const updateuser = async(e)=> {
        e.preventDefault();
        const {userName, name, email} = user;
        const res2 = await fetch(`http://localhost:8003/edituser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                userName, name, email
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        } else {
            alert("data added");
            navigate("/");
        }

    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded shadow p-4 mt-2">
                <h2 className="text-center m-4">Edit User</h2>
                <form>
                <div className="mb-3">
                    <label htmlFor="UserName" className="form-lable">
                        User Name
                    </label>
                    <input
                    type={"text"}
                    className='form-control'
                    placeholder="Ex. Jhon Doe"
                    name="userName"
                    Value={user.userName}
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
                    Value={user.name}
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
                    Value={user.email}
                    onChange={onInputChange}/>
                </div>
                <button type="submit" onClick={updateuser} className="btn btn-outline-primary">Submit</button>
                <Link to="/" className="btn btn-outline-danger mx-2">Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
