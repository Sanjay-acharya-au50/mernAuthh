import React, { useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({

    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const {email, password} = data;
    try {
      const {data} = await axios.post('/login', {
        email,
        password,
      })
      if(data.error){
        toast.error(data.error);

      }
      else{
        setData({})
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value})}
          placeholder="enter email"
          className="border border-black m-1"
        />
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="enter password"
          className="border border-black m-1"
        />
        <button type="submit" className="border border-black m-1 mt-[200px]">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
