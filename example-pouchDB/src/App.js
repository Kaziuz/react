import React, { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import IndexPage from './pages/index'
import ShowPage from './pages/show'
import NavBar from './components/NavBar'
import NewPage from './pages/NewPage'

import DB from './db'

import './App.css'
/*
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

  function handleSave (note) {
    // aqui llega la nota a hacerle post

    console.log('nota que llega', note)

    const ids = Object.keys(notes)
    const id = Math.max(...ids) + 1

    note['_id'] = id

    console.log('ids', ids)
    console.log('id', id)

    setNotes({
      notes: {
        ...prevNotes,
        [id]: note
      }
    })

    return id
  }

  console.log('state', notes)
  return (
    
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className="app-content">
          <Route exact path="/" component={props => <IndexPage {...props} notes={notes}/>} />
          <Route path="/new" component={props => <NewPage {...props} onSave={handleSave} note={notes[props.match.params.id]} />} />
          <Route exact path="/notes/:id" component={props => <ShowPage {...props} note={notes[props.match.params.id]} />} /> 
        </div>
      </div>
    </BrowserRouter>
  )
}
*/

class App extends React.Component {
  state = {
    db: new DB('notes-react'),
    notes: {}
  }

  async componentDidMount() {

    const notes = await this.state.db.getAllNotes()
    this.setState({ notes })
  }

  handleSave = async (note) => {
    // aqui llega la nota a hacerle post
    let res = await this.state.db.createNote(note)

    let { id } = res

    const { notes } = this.state

    this.setState({
      notes: {
        ...notes,
        [id]: note
      }
    })

    return id
  }

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className="app-content">
          <Route exact path="/" component={props => 
            <IndexPage {...props} notes={this.state.notes}/>} 
          />

          <Route exact path="/notes/:id" component={props => 
            <ShowPage {...props} note={this.state.notes[props.match.params.id]} />}
          /> 

          <Route path="/new" component={props => 
            <NewPage {...props} onSave={this.handleSave} note={this.state.notes[props.match.params.id]} />} 
          />
        </div>
      </div>
    </BrowserRouter>
    )
  }
}

export default App
