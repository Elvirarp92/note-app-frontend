import axios from 'axios'

export default class services {

  constructor(){
    this.service = axios.create({
      baseURL: 'http://127.0.0.1:8000/users'
    })
  }

  getUsers = () => this.service.get(`/`)

  getUser = (id) => this.service.get(`/${id}`)

  createUser = () => this.service.post(`/`)
}