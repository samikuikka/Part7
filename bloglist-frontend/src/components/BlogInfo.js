import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { initialize } from '../reducers/blogsReducer'
import { like, comment } from '../reducers/blogsReducer'

//styles
import {
  Typography,
  Link,
  Button,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'

import CommentIcon from '@mui/icons-material/Comment'
import IconButton from '@mui/material/IconButton'

const BlogInfo = () => {
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const [commentField, setComment ] = useState('')

  const increaseLike = () => {
    dispatch(like(blog))
  }

  const newMessage = async (event) => {
    event.preventDefault()
    await dispatch(comment(blog.id, { comment: commentField }))
    await dispatch(initialize())
    setComment('')
  }

  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(initialize())
  }, [dispatch])

  if(!blog) {
    return(null)
  }

  return(
    <div>
      <Typography variant='h4'>{blog.title}</Typography>
      <Link href={blog.url}>{blog.url}</Link>

      <div id='likes'
        styles={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', }}>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Typography variant='subtitle1'>{blog.likes} likes</Typography>
          </Grid>
          <Grid item>
            <Button variant='outlined' id='like-button' onClick={() => increaseLike(blog.id)}>like</Button>
          </Grid>
        </Grid>
      </div>

      <Typography variant='subtitle2'>added by {blog.author}</Typography>

      <Typography variant='h4'>comments</Typography>
      <form onSubmit={newMessage}>
        <div>
          <TextField
            id='comment'
            type="text"
            value={commentField}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <Button id='comment-button' color='primary' type="submit">add comment</Button>
        </div>
      </form>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        { blog.comments.map(comment =>
          <ListItem key={comment.id} >
            <ListItemText>{comment.comment}</ListItemText>
            <IconButton>
              <CommentIcon />
            </IconButton>
          </ListItem>
        )}
      </List>
    </div>
  )
}

export default BlogInfo