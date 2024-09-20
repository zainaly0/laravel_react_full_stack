import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const UserForm = () => {
     const { id } = useParams();
     const navigate = useNavigate();
     const [loading, setLoading] = useState(false);
     const [errors, setErrors] = useState(null);
     const {setNotification} = useStateContext
     const [user, setUser] = useState({
          id: null,
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
     });

     if (id) {
          useEffect(() => {
               setLoading(true);
               axiosClient("/users/${id")
                    .then(({ data }) => {
                         setLoading(false);
                         setUser(data);
                    })
                    .catch(() => {
                         setLoading(false);
                    });
          }, []);
     }

     const onSubmit = (ev) => {
          ev.preventDefault();
          if (user.id) {
               axiosClient
                    .put(`/users/${user.id}`, user)
                    .then(() => {
                         // todo show notification
                         setNotification("User was successfully updated")
                         navigate("/users");
                    })
                    .catch((err) => {
                         const response = err.response;
                         if (response && response.status == 402) {
                              setErrors(response.data.errors);
                         }
                    });
          } else {
               axiosClient
                    .post(`/users`, user)
                    .then(() => {
                         // todo show notification
                         setNotification("User was successfully created")
                         navigate("/users");
                    })
                    .catch((err) => {
                         const response = err.response;
                         if (response && response.status == 402) {
                              setErrors(response.data.errors);
                         }
                    });
          }
     };

     return (
          <>
               {user.id && <h1>Update user: {user.name}</h1>}
               {!user.id && <h1>New User</h1>}
               <div className="card animated fadeInDown">
                    {loading && <div className="text-center">Loading...</div>}
                    {errors && (
                         <div className="alert">
                              {Object.keys(errors).map((key) => {
                                   <p key={key}>{errors[key][0]}</p>;
                              })}
                         </div>
                    )}
                    {!loading && (
                         <from onSubmit={onSubmit}>
                              <input
                                   value={user.name}
                                   onChange={(ev) =>
                                        setUser({
                                             ...user,
                                             name: ev.target.value,
                                        })
                                   }
                                   type="text"
                                   placeholder="name"
                              />
                              <input
                                   value={user.email}
                                   onChange={(ev) =>
                                        setUser({
                                             ...user,
                                             email: ev.target.value,
                                        })
                                   }
                                   type="email"
                                   placeholder="email"
                              />
                              <input
                                   onChange={(ev) =>
                                        setUser({
                                             ...user,
                                             password: ev.target.value,
                                        })
                                   }
                                   type="password"
                                   placeholder="password"
                              />
                              <input
                                   onChange={(ev) =>
                                        setUser({
                                             ...user,
                                             password_confirmation:
                                                  ev.target.value,
                                        })
                                   }
                                   type="password"
                                   placeholder="password Confirmation"
                              />
                              <button className="btn">Save</button>
                         </from>
                    )}
               </div>
          </>
     );
};

export default UserForm;
