import React, { Component } from 'react'

import NotesService from './../../services/notes.service'
import UsersService from './../../services/users.service'
import TagsService from './../../services/tags.service'

import './noteForm.css'

class NoteForm extends Component {
  constructor() {
    super()

    this.state = {
      fetchedUsers: [],
      fetchedTags: [],
      noteInfo: {},
    }

    this.usersService = new UsersService()
    this.notesService = new NotesService()
    this.tagsService = new TagsService()
  }

  getAllUsers = () =>
    this.usersService
      .getUsers()
      .then((response) => this.setState({ fetchedUsers: response.data }))
      .catch((err) => console.log(err))

  getAllTags = () =>
    this.tagsService
      .getTags()
      .then((response) => this.setState({ fetchedTags: response.data }))
      .catch((err) => console.log(err))

  componentDidMount = () =>
    this.getAllTags()
      .then(() => this.getAllUsers())
      .catch((err) => console.log(err))

  handleInputChange = (event) => {
    let noteInfoCopy = { ...this.state.noteInfo }
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    switch (event.target.name) {
      case 'end_date':
        noteInfoCopy = { ...noteInfoCopy, [event.target.name]: new Date(Date.parse(value)) }
        break

      default:
        noteInfoCopy = { ...noteInfoCopy, [event.target.name]: value }
        break
    }

    noteInfoCopy = {...noteInfoCopy, creation_date: new Date()}
    this.setState({ noteInfo: noteInfoCopy })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.noteInfo)
    this.notesService
      .createNote(this.state.noteInfo)
      .then((res) => this.props.history.push('/'))
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='label-wrapper'>
          <label htmlFor='note'>Note text:</label>
          <textarea
            name='note'
            id='note'
            cols='30'
            rows='10'
            onChange={this.handleInputChange}></textarea>
        </div>
        <div className='flex-wrapper'>
          <div className='label-wrapper'>
            <label htmlFor='user'>User:</label>
            <select name='user' id='user' onChange={this.handleInputChange}>
              {this.state.fetchedUsers.map((elm) => (
                <option id={elm.id} value={elm.id}>
                  {elm.name}
                </option>
              ))}
            </select>
          </div>
          <div className='label-wrapper'>
            <label htmlFor='note_type'>Type:</label>
            <select name='note_type' id='note_type' onChange={this.handleInputChange}>
              <option value='NEW'>New</option>
              <option value='RDY'>Ready</option>
              <option value='WIP'>Work in progress</option>
              <option value='TEST'>Ready for testing</option>
              <option value='DONE'>Done</option>
            </select>
          </div>
          <div className='label-wrapper'>
            <label htmlFor='tag'>Tags:</label>
            <select name='tag' id='tag' multiple onChange={this.handleInputChange}>
              {this.state.fetchedTags.map((elm) => (
                <option id={elm.id} value={elm.id}>
                  {elm.name}
                </option>
              ))}
            </select>
          </div>
          <div className='label-wrapper'>
            <label htmlFor='is_task'>Is it a task?</label>
            <input type='checkbox' name='is_task' id='is_task' onChange={this.handleInputChange} />
          </div>
          <div className='label-wrapper'>
            <label htmlFor='end_date'>End date:</label>
            <input type='date' name='end_date' id='end_date' onChange={this.handleInputChange} />
          </div>
          {/* <input type='file' name='attachment' id='attachment' onChange={this.handleInputChange} /> */}
        </div>
        <button type='submit'>Create note</button>
        <hr />
      </form>
    )
  }
}

export default NoteForm
