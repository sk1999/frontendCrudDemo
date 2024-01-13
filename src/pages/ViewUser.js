import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewUser() {

    const {id} = useParams("");
    
    console.log(id);

    const [getuserdata,setUserdata] = useState([]);
    console.log(getuserdata);
    
    const getUsersData = async()=>{
    
        const res = await fetch(`http://localhost:8003/viewuser/${id}`,{
            method: "GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
    
        const data = await res.json();
        console.log(data);
    
        if(res.status === 422 || !data){
            console.log("error ");
        }
        else{
          setUserdata(data);
            console.log("got data");
        }
    }

    useEffect(()=>{
        getUsersData();
    })

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded shadow p-4 mt-2">
                <h2 className="text-center m-4">User Detail</h2>
                <div className="card">
                    <div className="card-header">
                        Details of user id:
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>User Name:</b>
                                {getuserdata.userName}
                            </li>
                            <li className="list-group-item">
                                <b>Name:</b>
                                {getuserdata.name}
                            </li>
                            <li className="list-group-item">
                                <b>E-mail:</b>
                                {getuserdata.email}
                            </li>
                        </ul>
                    </div>
                </div>
                <Link className="btn btn-primary my-2" to={"/"}>Back</Link>
             </div>
        </div>
    </div>
  )
}
