import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { FormCustomHooks } from "../hooks/FormCustomHooks"
import { useSearchParams } from 'react-router-dom';

const Login = () => {
  const { login, error } = FormCustomHooks();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleSubmit = (e)=> {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    login(email, password);
  }

  const msg = new URLSearchParams(searchParams).get("message");

  return (
    <>
    <Navbar />
    <form onSubmit={handleSubmit} className="form">
      <h2 className="form-heading">
        Login
      </h2>

      { msg && <div className='login-first-error'>{msg}</div> }

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" />
        { error && <div className="error error-email">{error.email}</div> }
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        { error && <div className="error error-password">{error.password}</div> }
        { error && <div className="error error-password">{error.invalid}</div> }
      </div>

      <button className='form-btn'>Login</button>
    </form>
    </>
  )
}

export default Login