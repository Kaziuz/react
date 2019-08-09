import React, { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import IndexPage from './pages/index'
import ShowPage from './pages/show'
import NavBar from './components/NavBar'
import NewPage from './pages/NewPage'
import EditPage from './pages/EditPage'

import DB from './db'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    let db = new DB()
    this.state = {
      db,
      notes: {},
      loading: true
    }
  }

  async componentDidMount() {
    const notes = await this.state.db.getAllNotes()
    this.setState({ notes, loading: false })
  }

  async handleCreate (note, method) {
    // aqui llega la nota a hacerle put o post
    let res = await this.state.db[method](note);
    let { notes } = this.state

    note._id = res.id

    this.setState({
      notes: { ...notes, [res.id]: note }
    })

    return res
  }

  async handleEdit (note, method) {
    // aqui llega la nota a hacerle put o post
    let res = await this.state.db[method](note);
    let { notes } = this.state

    note._id = res.id

    this.setState({
      notes: { ...notes, [res.id]: note }
    })

    return res
  }

  async handleDelete(id) {
    let { notes } = this.state
    let note = notes[id]

    if(notes[id] && window.confirm("esta seguro de borrarlo?")) {
      await this.state.db.deleteNote(note)
      delete notes[id]
      this.setState({ notes })
    }
  }

  renderContent() {
    if(this.state.loading) {
      return <h2>Loading</h2>
    }

    return (
      <div className="app-content">
      <Route exact path="/" component={props => 
        <IndexPage {...props} notes={this.state.notes}/>} 
      />

      <Route exact path="/notes/:id" component={props => 
        <ShowPage {...props}
          onDelete={id => this.handleDelete(id)}
          note={this.state.notes[props.match.params.id]} 
        />}
      />

      <Route path="/notes/:id/edit" component={props =>
        <EditPage {...props}
          onSave={note => this.handleEdit(note, 'updateNote')} 
          note={this.state.notes[props.match.params.id]} 
        />
      } />

      <Route path="/new" component={props => 
        <NewPage {...props}
          onSave={note => this.handleCreate(note, 'createNote')}
        />} 
      />
    </div>
    )
  }

  render() {
    console.log('db', this.state.db)
    return (
      <BrowserRouter>
      <div className="App">
        <NavBar />
        {this.renderContent()}
      </div>
    </BrowserRouter>
    )
  }
}

export default App
