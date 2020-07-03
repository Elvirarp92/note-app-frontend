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

  render() {
    return (
      <form action='POST'>
        <div className='label-wrapper'>
          <label htmlFor='note'>Note text:</label>
          <textarea name='note' id='note' cols='30' rows='10'></textarea>
        </div>
        <div className='flex-wrapper'>
          <div className='label-wrapper'>
            <label htmlFor='user'>User:</label>
            <select name='user' id='user'>
              {this.state.fetchedUsers.map((elm) => (
                <option id={elm.id} value={elm.id}>
                  {elm.name}
                </option>
              ))}
            </select>
          </div>
          <div className='label-wrapper'>
            <label htmlFor='type'>Type:</label>
            <select name='type' id='type'>
              <option value='NEW'>New</option>
              <option value='RDY'>Ready</option>
              <option value='WIP'>Work in progress</option>
              <option value='TEST'>Ready for testing</option>
              <option value='DONE'>Done</option>
            </select>
          </div>
          <div className='label-wrapper'>
            <label htmlFor='tags'>Tags:</label>
            <select name='tags' id='tags' multiple>
              {this.state.fetchedTags.map((elm) => (
                <option id={elm.id} value={elm.id}>
                  {elm.name}
                </option>
              ))}
            </select>
          </div>
          <div className='label-wrapper'>
            <label htmlFor='is_task'>Is it a task?</label>
            <input type='checkbox' name='is_task' id='is_task' />
          </div>
          <div className='label-wrapper'>
            <label htmlFor='end_date'>End date:</label>
            <input type='date' name='end_date' id='end_date' />
          </div>
        </div>
        <button type="submit">Create note</button>
        <hr/>
      </form>
    )
  }
}

export default NoteForm
