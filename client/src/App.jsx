
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import { UseProvider } from '../context/userContext'
import Dashboard from './pages/Dashboard'

// https://sanjay-mern-authh-backend.vercel.app
// http://localhost:8000
axios.defaults.baseURL = "https://sanjay-mern-authh-backend.vercel.app";
axios.defaults.withCredentials = true;

function App() {


  return (
    <UseProvider>
      <Navbar/>
      <Toaster position='bottom-right' toastOptions={{duration:2000}}/> 
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </UseProvider>
  )
}

export default App
