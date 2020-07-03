import React, { Component } from 'react'
import './App.css'

import NotesService from './../services/notes.service'

import NoteList from './noteList/noteList'

class App extends Component {
  constructor() {
    super()
    this.state = {
      notes: [],
    }
    this.notesService = new NotesService()
  }

  getAllNotes = () => {
    this.notesService
      .getNotes()
      .then((response) => {
        this.setState({ notes: response.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount = () => this.getAllNotes()

  render() {
    return (
      <main className='App'>
        <NoteList />
      </main>
    )
  }
}

export default App
