import axios from 'axios'

export default class services {

  constructor(){
    this.service = axios.create({
      baseURL: 'http://127.0.0.1:8000/tags'
    })
  }

  getTags = () => this.service.get(`/`)

  getTag = (id) => this.service.get(`/${id}`)

  createTag = () => this.service.post(`/`)
}