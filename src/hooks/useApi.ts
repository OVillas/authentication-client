import axios from 'axios'
import { SignInCredencional } from '../types/SignInCredencional'
import { User } from '../types/User'
import { jwtDecode } from 'jwt-decode'
import { ErrorResponse } from '../types/ErrorResponse'

const api = axios.create({
    baseURL: 'http://localhost:8080/v1',
})

type SignInResponse = {
    user: User
    token: string
}

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken')
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
            localStorage.removeItem('authToken')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export const useApi = () => ({
    recoveryUserInformation: async (): Promise<User> => {
        const response = await api.get('/user')

        if (response.status === 200) {
            return response.data as User
        }

        const errorResponse = response.data as ErrorResponse
        throw new Error(errorResponse.Message)
    },

    signin: async ({
        username,
        password,
    }: SignInCredencional): Promise<SignInResponse> => {
        const response = await api.post('/auth/login', {
            username,
            password,
        })

        if (response.status === 200) {
            api.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${response.data}`
            
            const user = jwtDecode<User>(response.data)
            
            return { user, token: response.data }
        }

        const errorResponse = response.data as ErrorResponse
        throw new Error(errorResponse.Message)
    },

    logout: async () => {
        delete api.defaults.headers.common['Authorization']
        const response = await api.post('/logout')
        return response.data
    },
})
