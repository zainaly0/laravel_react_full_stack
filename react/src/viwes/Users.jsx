import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const Users = () => {
     const [users, setUsers] = useState([]);
     const [loading, setLoading] = useState(false);
     const {setNotification} = useStateContext()

     useEffect(() => {
          getUsers();
     }, []);

     const onDelete = () =>{
          if(window.confirm("are you sure you want to delete this user?")){
               return
          }

          axiosClient.delete(`{/users/${u.id}`)
          .then(() =>{
               // todo show notificaiton
               setNotification("User was successfully updated")
               setNoti
               getUsers()
          })
     }

     const getUsers = () => {
          setLoading(true);
          axiosClient
               .get("/users")
               .then(({ data }) => {
                    setLoading(false);
                    console.log(data);
                    setUsers(data.data)
               })
               .catch(() => {
                    setLoading(false);
               });
     };
     return (
          <div>
               <div style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h1>Users</h1>
                    <Link to="" className="btn-add">Add new</Link>
               </div>
               <div className="card animated fadeInDown">
                    <table>
                         <thead>
                              <tr>
                                   <th>Id</th>
                                   <th>name</th>
                                   <th>Email</th>
                                   <th>Create Date</th>
                                   <th>Actions</th>
                              </tr>
                         </thead>
                         {
                              loading && <tbody>
                                   <tr>
                                        <td colSpan="5" className="text-center">
                                             Loading...
                                        </td>
                                   </tr>
                              </tbody>
                         }

                         {!loading && <tbody>
                              
                              {
                                   users.map(u =>(
                                        <tr>
                                             <td>{u.id}</td>
                                             <td>{u.name}</td>
                                             <td>{u.email}</td>
                                             <td>{u.created_at}</td>
                                             <td>
                                                  <Link to={'/users/'+u.id} className="btn-edit">Edit</Link>
                                                  &nbsp;
                                                  <button onClick={ev => onDelete} className="btn-delete">Delete</button>
                                             </td>
                                        </tr> 
                                   ))
                              }
                         </tbody> }
                    </table>
               </div>
          </div>
     );
};

export default Users;
