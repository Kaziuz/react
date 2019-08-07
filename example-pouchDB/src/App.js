import React, { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import IndexPage from './pages/index'
import ShowPage from './pages/show'
import NavBar from './components/NavBar'

import './App.css'

function App(props) {

  const [notes, setNotes] = useState({
    1: {
      _id: 1,
      title: "Hello, world",
      body: 'Este es el cuerpo de mi nota',
      updatedAt: new Date()
    },
    2: {
      _id: 2,
      title: "Hello, world other wase",
      body: 'Este es el cuerpo de mi nota 2',
      updatedAt: new Date()
    }
  })

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className="app-content">
          <Route exact path="/" component={props => <IndexPage {...props} notes={notes}/>} />
          <Route exact path="/notes/:id" component={props => <ShowPage {...props} note={notes[props.match.params.id]} />} /> 
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
