import React from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { useState } from 'react'
import '../style/form.scss'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'



const Login = () => {

  const {user, loading, handleLogin} = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigator = useNavigate()

  const loginHandler = async(e) =>{
    e.preventDefault()

    await handleLogin(username, password)
    console.log("user logging in")
    navigator('/')
   
  }

  if(loading){
   return (<main><h1>Loading...</h1></main>)
  }


  return (
   <main>
    <div className='form-container'>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <input
        onInput={(e)=>{setUsername(e.target.value)}}
        type="text" name="username" placeholder="Enter Username" />
        <input
        onInput={(e)=>{setPassword(e.target.value)}}
        type="password" name="password" placeholder="Enter Password" />
        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <Link className='toggolAuthForm' to="/register">Register</Link></p>
      </div>
   </main>
  )
}

export default Login
