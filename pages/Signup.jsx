import React from 'react'
import Navbar from '../components/Navbar'
import { FormCustomHooks } from "../hooks/FormCustomHooks"

const Signup = () => {
  const { signup, error } = FormCustomHooks();
  
  const handleSubmit = (e)=> {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")
    const password = formData.get("password")

    signup(email, password)
  }



  return (
    <>
    <Navbar />
    <form onSubmit={handleSubmit} className="form" >
      <h2 className="form-heading">
        Signup
      </h2>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" />
        { error && <div className="error error-email">{error.email}</div> }
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        { error && <div className="error error-password">{error.password}</div> }
      </div>

      <button className='form-btn'>Signup</button>
    </form>
    </>
  )
}

export default Signup