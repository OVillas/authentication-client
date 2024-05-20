import axios, { AxiosResponse } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { ErrorResponse } from '../types/ErrorResponse'
import { SignInCredencional } from '../types/SignInCredencional'
import { User } from '../types/User'
import { AuthState } from '../utils/authState'

const api = axios.create({
    baseURL: 'http://localhost:8080/v1',
})

type SignInResponse = {
    user: User
    token: string
}


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

export const useApi = () => ({
    recoveryUserInformation: async (): Promise<User> => {
        const response: AxiosResponse<User | ErrorResponse> = await api.get('/user')

        if (response.status === 200) {
            return response.data as User
        }

        const errorResponse = response.data as ErrorResponse
        throw new Error(errorResponse.message)
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

            const token: string = response.data
            api.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${token}`

            const payload = jwtDecode(token) as User

            return {
                user: payload,
                token: token,
            }
        }

        const errorResponse = response.data as ErrorResponse
        throw new Error(errorResponse.message)
    },

    logout: async () => {
        delete api.defaults.headers.common['Authorization']
        return true
    },
})
