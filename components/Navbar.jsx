import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaLightbulb } from 'react-icons/fa'


const Navbar = () => {
  return (
    <header className='header'>
        <nav className="header-nav">
            <div className="switch">
              <FaLightbulb />
            </div>
    
            <ul className="nav-links">
              <li>
                <NavLink to="/" className="link">Home</NavLink>
                <NavLink to="/login" className="link">Login</NavLink>
                <NavLink to="/signup" className="link">Signup</NavLink>
              </li>
            </ul>
          </nav>
    </header>
  )
}

export default Navbar