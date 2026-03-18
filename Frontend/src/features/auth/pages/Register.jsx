import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'


const Register = () => {

  const {user, loading, handleRegister} = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigator = useNavigate()

  const registerHandler = async (e) => {
    
    e.preventDefault()

   await handleRegister(username, email, password)

    console.log("user registered")
    navigator('/') 
    
  }

  if(loading){
    return (<main><h1>Loading...</h1></main>)
  }

  return (
    <main>
      <div className='form-container'>
        <h1>Register</h1>
        <form onSubmit={registerHandler}>
          <input 
          onInput={(e)=>{ setUsername(e.target.value)}}
          type="text" name="username" placeholder="Enter Username" />
          <input 
          onInput={(e)=>{ setEmail(e.target.value)}}
          type="email" name="email" placeholder="Enter Email" />
          <input
          onInput={(e)=>{setPassword(e.target.value)}}
          type="password" name="password" placeholder="Enter Password" />
          <button type="submit">Register</button>
        </form>

        <p>Already have an account? <Link className='toggolAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register
