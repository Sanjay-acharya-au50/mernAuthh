import React from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate()

  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const fun = async () => {
      const res = await axios.get("/profile");
      // console.log(res);
      setUser(res);
    };
    fun();
  }, []);
  console.log("user :", user);
  
  const handleLogout = () => {
    fetch("http://localhost:8000/logout",{
        credentials : "include",
        method : "POST"
    })
    setUser(null)

    toast.success("logout successfully")
    navigate("/login")
  }

  return (
    <div>
      {user && (
        <>
      <h1>Dashboard</h1>

          <h1>hi {user.data.id}!</h1>
          <h1>name: {user.data.name}!</h1>
      <button onClick={handleLogout} className="border p-2">Logout</button>

        </>
      )}

    </div>
  );
};

export default Dashboard;
