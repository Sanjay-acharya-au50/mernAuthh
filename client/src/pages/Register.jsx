import React, { useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
      });
      
  const registerUser = async (e) => {
    e.preventDefault();
    const {name,email,password} = data;
    try {
      const {data} = await axios.post("/register", {
        name,email,password
      })
      console.log(data)
      if(data.error){
        toast.error(data.error)
      }
      else{
        setData({})
      
      }
    } catch (error) {
      console.log(error);
      
    }
    
  };
  return (
    <div>
      <form onSubmit={registerUser}>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="enter name"
          className="border border-black m-1"
        />
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
          register
        </button>
      </form>
    </div>
  );
};

export default Register;
