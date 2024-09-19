import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Signup = () => {
     const nameRef = useRef();
     const emailRef = useRef();
     const passwordRef = useRef();
     const passwordConfirmationRef = useRef();
     const { setUser, setToken } = useStateContext();
     const [errors, setErrors] = useState(null);

     const onSubmit = (ev) => {
          // debugger;
          ev.preventDefault();

          const payload = {
               name: nameRef.current.value,
               email: emailRef.current.value,
               password: passwordRef.current.value,
               password_confirmation: passwordConfirmationRef.current.value,
          };
          console.log(payload);

          axiosClient
               .post("/signup", payload)
               .then(({ data }) => {
                    // return data.
                    setUser(data.user);
                    setToken(data.token);
               })
               .catch((error) => {
                    // console.log(error)
                    const response = error.response;
                    if (response && response.status == 422) {
                         // response.dta.errors
                         // console.log(response.data.errors)
                         setErrors(response.data.errors);
                    }
               });
     };

     return (
          <div className="login-signup-form animated fadeInDown">
               <div className="form">
                    <form onSubmit={onSubmit} action="">
                         <h1 className="title">Signup for free</h1>

                         {errors && (
                              <div className="alert">
                                   {Object.keys(errors).map((key) => {
                                        <p key={key}>{errors[key][0]}</p>;
                                   })}
                              </div>
                         )}

                         <input
                              ref={nameRef}
                              type="text"
                              placeholder="Full Name"
                         />
                         <input
                              ref={emailRef}
                              type="email"
                              placeholder="Email Address"
                         />
                         <input
                              ref={passwordRef}
                              type="password"
                              placeholder="Password"
                              autoComplete="new-password"
                         />
                         <input
                              ref={passwordConfirmationRef}
                              type="password"
                              placeholder="Password Confirmation"
                              autoCapitalize="new-password"
                         />
                         <button className="btn btn-block">Signup</button>
                         <p className="message">
                              Already Registered?
                              <Link to="/login">Sign in</Link>
                         </p>
                    </form>
               </div>
          </div>
     );
};

export default Signup;