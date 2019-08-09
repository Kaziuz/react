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

  async handleSave (note, method) {
    // aqui llega la nota a hacerle put o post
    let res = await this.state.db[method](note);
    let { notes } = this.state

    note._id = res.id
    note._rev = res._rev

    this.setState({
      notes: { ...notes, [res.id]: note }
    })

    return res
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
          note={this.state.notes[props.match.params.id]} 
        />}
      />

      <Route path="/notes/:id/edit" component={props =>
        <EditPage {...props}
          onSave={note => this.handleSave(note, 'updateNote')} 
          note={this.state.notes[props.match.params.id]} 
        />
      } />

      <Route path="/new" component={props => 
        <NewPage {...props} 
          note={this.state.notes[props.match.params.id]} 
        />} 
      />
    </div>
    )
  }

  render() {
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
