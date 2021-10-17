import React, { useState } from 'react'
import {
  Button,
  TextField
} from '@material-ui/core'


const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author:author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog} align='center'>
      <div>
        <TextField
          id='title'
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          label='title'
        />
      </div>
      <div>
        <TextField
          id='author'
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          label='author'
        />
      </div>
      <div>
        <TextField
          id='url'
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          label='url'
        />
      </div>
      <Button id='create-button' color='primary' type="submit">create</Button>
    </form>
  )
}


export default CreateForm