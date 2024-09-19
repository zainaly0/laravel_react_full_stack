import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";

const UserForm = () => {
     const { id } = useParams();
     const [loading, setLoading] = useState(false);
     const [errors, setErrors] = useState(null)
     cosnt[(user, setUser)] = useState({
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
               </div>
          </>
     );
};

export default UserForm;
