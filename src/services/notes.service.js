import axios from 'axios'

export default class services {

  constructor(){
    this.service = axios.create({
      baseURL: 'http://127.0.0.1:8000/notes'
    })
  }

  getNotes = () => this.service.get(`/`)

  getNote = (id) => this.service.get(`/${id}`)

  createNote = ({creation_date, end_date, note, is_task, note_type}) => this.service.post(`/`, {creation_date, end_date, note, is_task, note_type})
}