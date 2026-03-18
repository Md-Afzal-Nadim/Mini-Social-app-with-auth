import React from 'react'
import { useState,useRef } from 'react'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router'

const CreatePost = () => {

  const [caption, setCaption] = useState('')
  const postImage = useRef(null)

  const navigator = useNavigate()

  const {loading, handleCreatePost} = usePost()


  function handalSubmit(e) {
    e.preventDefault()

    const file =postImage.current.files[0]
    handleCreatePost(file, caption)

    navigator('/')
  }


  if(loading) {
    return (<main><h1>Create Post is Loading...</h1></main>)
  }


  return (
    <main className='create-post-page'>
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handalSubmit}>

          <input ref={postImage} type="file" name="" id="" />

          <input 
          value={caption}
          onChange={(e)=>{setCaption(e.target.value)}} 
          type="text" name="caption" id="" placeholder='Enter Caption' />

          <button className='primary-button'>Create post</button>
        </form>
      </div>
    </main>
  )
}

export default CreatePost
