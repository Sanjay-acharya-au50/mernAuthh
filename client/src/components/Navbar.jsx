import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>

        <Link className='m-2' to="/">home</Link>
        <Link className='m-2' to="/login">Login</Link>
        <Link className='m-2' to="/register">Register</Link>
    
    </div>
  )
}

export default Navbar