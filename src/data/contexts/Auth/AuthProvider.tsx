import { useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'
import { AuthContext } from './AuthContext'
import { SignInCredencional } from '../../types/SignInCredencional'
import { User } from '../../types/User'
import { AuthState } from '../../utils/authState'
import axios from 'axios'
import { ErrorResponse } from '../../types/ErrorResponse'
import Swal, { SweetAlertIcon } from 'sweetalert2'

const handlerError = (error: ErrorResponse, iconInput: SweetAlertIcon) => {
    Swal.fire({
        icon: iconInput,
        title: error.error,
        text: error.message,
    })
}

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const api = useApi()

    useEffect(() => {
        const validateToken = async () => {
            const token = AuthState.getToken()
            if (token) {
                try {
                    const user = await api.recoveryUserInformation()
                    if (user) {
                        setUser(user)
                    }
                } catch (error) {
                    console.error('Failed to recover user information:', error)
                    setUser(null)
                    AuthState.removeToken()
                }
            }
            setLoading(false)
        }
        validateToken()
    }, [])

    const signin = async ({ username, password }: SignInCredencional) => {
        try {
            const { user, token } = await api.signin({
                username,
                password,
            })

            if (token) {
                setUser(user)
                AuthState.setToken(token)
                return { authenticated: true, path: '/home' }
            }

            return { authenticated: false, path: '/login' }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorResponse = error.response.data as ErrorResponse

                switch (error.response.status) {
                    case 403:
                        return {
                            authenticated: false,
                            path: '/login',
                        }
                    case 409:
                        handlerError(errorResponse, 'warning')
                        return {
                            authenticated: true,
                            path: '/email/confirm',
                        }
                    default:
                        return {
                            authenticated: false,
                            path: '/login',
                        }
                }
            } else {
                return {
                    authenticated: false,
                    path: '/login',
                }
            }
        }
    }

    const signout = async () => {
        setUser(null)
        AuthState.removeToken()
        await api.logout()
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
