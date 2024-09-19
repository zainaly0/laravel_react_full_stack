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

    const onSubmit = (ev) => {
        ev.preventDefault()
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
                {
                    !loading &&
                    <from onSubmit={onSubmit}>
                        <input value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} type="text" placeholder="name" />
                        <input value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })} type="email" placeholder="email" />
                        <input onChange={ev => setUser({ ...user, password: ev.target.value })} type="password" placeholder="password" />
                        <input onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} type="password" placeholder="password Confirmation" />
                        <button className="btn">Save</button>
                    </from>
                }
            </div>
        </>
    );
};

export default UserForm;
