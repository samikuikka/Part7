import React, { useState } from 'react'
import { useField } from './hooks/index'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory
} from 'react-router-dom'

const Menu = ({ addNew, anecdotes, anecdote, notification}) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
       <div>
          <Link to='/' style={padding}>anecdotes</Link>
          <Link to='/create' style={padding}>create new</Link>
          <Link to='/about' style={padding}>about</Link>
       </div>

       {notification ? notification : null}

       <Switch>
         <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
         </Route>
         <Route path="/create">
           <CreateNew addNew={addNew}/>
         </Route>
         <Route path="/about">
           <About />
         </Route>
         <Route path="/">
           <AnecdoteList anecdotes={anecdotes} />
         </Route>
       </Switch>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={`${anecdote.info}`}>${anecdote.info}</a></div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
         <li key={anecdote.id} >
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
         </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {

  const contentHook = useField('content')
  const authorHook = useField('author')
  const infoHook = useField('info')

  const noReset = ({name, value, onChange}) => {
    return( {
      name,
      value,
      onChange
    })
  }
  
  const content2 = noReset(contentHook)
  const author2 = noReset(authorHook)
  const info2 = noReset(infoHook)



  const history = useHistory()

  const handleSubmit = (e) => {
    const content = contentHook.value
    const author = authorHook.value
    const info = infoHook.value


    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    history.push('/')
  }

  const reset = () => {
    contentHook.reset()
    authorHook.reset()
    infoHook.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content2} />
        </div>
        <div>
          author
          <input {...author2} />
        </div>
        <div>
          url for more info
          <input {...info2} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={reset} >reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }


  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const newMatch = useRouteMatch('/anecdotes/:id')
  const foundAnecdote = newMatch
    ? anecdotes.find(a => a.id === newMatch.params.id)
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu addNew={addNew} setNotification={setNotification} anecdotes={anecdotes} anecdote={foundAnecdote} notification={notification} />
      <Footer />
    </div>
  )
}

export default App;