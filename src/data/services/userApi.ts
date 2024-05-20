import axios from 'axios'
import { AuthState } from '../utils/authState'
import { SignUpCredencional } from '../types/SignUpCredencional'
import { ErrorResponse } from '../types/ErrorResponse'

const api = axios.create({
    baseURL: 'http://localhost:8080/v1',
})

api.interceptors.request.use(
    (config) => {
        const token = AuthState.getToken()
        if (token) {
            if (!config.headers) {
                config.headers = {}
            }
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            AuthState.removeToken()
            window.location.href = '/signIn'
        }
        return Promise.reject(error)
    }
)

export const userApi = {
    signUp: async ({ name, email, username, password }: SignUpCredencional) => {
        const response = await api.post('/users', {
            name,
            email,
            password,
            username,
        })

        if (response.status === 201) {
            return { success: true };
        }

        const errorResponse = response.data as ErrorResponse
        throw new Error(errorResponse.message)
    },
}
