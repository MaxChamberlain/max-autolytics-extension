import axios from 'axios'

const new_instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('Authorization')
  }
})

export default new_instance