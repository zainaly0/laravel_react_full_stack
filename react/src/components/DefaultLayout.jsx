import React, { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const DefaultLayout = () => {
     const { user, token } = useStateContext();

     if (!token) {
          return <Navigate to="/login" />;
     }

     const onLogout = (ev) =>{
          ev.preventDefault()
          
     }

     return (
          <div id="defaultLayout">
               <aside>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/users">users</Link>
               </aside>
            <div className="content">
               <header>
                    <div>

                    </div>

                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
               </header>

               <main>
                    <Outlet />
               </main>
            </div>
          </div>
     );
};

export default DefaultLayout;
