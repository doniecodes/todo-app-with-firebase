import React, { useEffect, useRef, useState } from 'react'
import { FaLightbulb } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { FormCustomHooks } from '../hooks/FormCustomHooks';

const Header = (props) => {
  localStorage.setItem("mode", "light")
  const { logout, user } = FormCustomHooks();
  const [ mode, setMode ] = useState(localStorage.getItem("mode"));
    const userEmail = user && user.email;


    useEffect(()=> {
      const localMode = localStorage.getItem("mode")
      if(localMode){
        setMode(localMode)
      }
    }, [mode])

    const handleSwitch = ()=> {
      if(mode === "light"){
        localStorage.setItem("mode", "dark")
      }
      if(mode === "dark"){
        localStorage.setItem("mode", "light")
      }
    }

    const handleLogout = ()=> {
      logout();
    }

    const userDivRef = useRef(null);
    const handleShowBio = ()=> {
      userDivRef.current.classList.toggle("active");
    }

  return (
    <>
      <header className={`header ${mode}`}>
      <nav className="header-nav">
        <div className="switch">
          <FaLightbulb  className={`switcher ${mode}`} onClick={handleSwitch} />
        </div>

        <ul className="nav-links">
          <li>
            {user && <h3 className='user-email'
            onClick={handleShowBio}>{userEmail}</h3>}
            
            { user &&
            <div className="user-account-div"
            ref={userDivRef}>
            <h3>{userEmail}</h3>
            <p className="user-bio">
              Your bio is currently empty.
            </p>
            </div>
          }         

            <NavLink to="/" className="link">Home</NavLink>
            { user ? <NavLink to="/login" className="link" onClick={handleLogout}>Logout</NavLink>
            : <>
                <NavLink to="/login" className="link">Login</NavLink>
                <NavLink to="/signup" className="link">Signup</NavLink>
              </> }
          </li>
        </ul>
      </nav>


      <div className="header-form-wrapper">
        <h1 className='heading-1'>TODO'S</h1>

        <form onSubmit={props.renderNewItem} className="header-form">
            <div>
            <input name="todo" type="text" className='form-input'
            placeholder='Add a task here...' />
            <button className='add-btn'>Add</button>
            </div>
        </form>
      </div>

    </header>
    </>
  )
}

export default Header