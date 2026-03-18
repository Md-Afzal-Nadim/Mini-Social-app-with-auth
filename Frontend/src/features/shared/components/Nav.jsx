import React from 'react'
import '../Nav.scss'
import { useNavigate } from 'react-router'


const Nav = () => {

const navigate = useNavigate()

  return(
    <nav className='nav-bar'>
      <p>insta</p>
      <button 
      onClick={()=>{navigate('/create-post')}}
      className='primary-button'>new post</button>
    </nav>
  )
}

export default Nav
