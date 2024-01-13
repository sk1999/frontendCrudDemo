import React, { useEffect, useState, useHistory, useContext } from "react";
import { Link } from "react-router-dom";
import { adddata } from './ContextProvider';

export default function Home() {
  
  const [getuserdata, setUserdata] = useState([]);

  console.log(getuserdata);

  const {userdata, setuserdata} =useContext(adddata);

  //const history = useHistory()

  const getUsersData = async (e) => {
    const res = await fetch("http://localhost:8003/getusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      console.log("error ");
    } else {
      setUserdata(data);
      console.log("got data");
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://localhost:8003/deleteuser/${id}`, {
      method: "DELETE",
      header: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);
    if (res2.status === 422 || !deletedata) {
      console.log("error");
    }
    else{
      console.log("user deleted");
      getUsersData();
      //history.push()
    }
  };

  return (
    <>
      {
        userdata ?
        <>
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Success!</strong> User added successfully
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
        </> : ""
      }

      <div className="mt-5">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {getuserdata.map((element, id) => {
              return (
                <tr>
                  <th scope="row">{id + 1}</th>
                  <td>{element.userName}</td>
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>
                    <Link
                      to={`/viewuser/${element._id}`}
                      className="btn btn-primary mx-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edituser/${element._id}`}
                      className="btn btn-outline-primary mx-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteuser(element._id)}
                      //to={`/deleteuser/${id}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
