import axios from '../lib/axios'

function useLogin() {
  return async function login(EmailAddress: string, Password: string) {
    try {
      const response = await axios.post('/auth', {
        EmailAddress,
        Password
      })
      const authHeader = response.headers['authorization']
      if (!authHeader) throw new Error('No authorization header')
      localStorage.setItem('Authorization', authHeader)
      window.location.reload()
    } catch (error: any) {
      console.log(error)
    }
  }
}

function useAuthUser() {
      return async function authUser() {
    try {
      if(!localStorage.getItem('Authorization')) return
      const response = await axios.get('/auth')
      return response.data
    } catch (error: any) {
      localStorage.removeItem('Authorization')
      window.location.reload()
    }
  }
}

export { useLogin, useAuthUser }