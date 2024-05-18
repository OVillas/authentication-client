import { useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'
import { User } from '../../types/User'
import { AuthContext } from './AuthContext'
import { SignInCredencional } from '../../types/SignInCredencional'

const TOKEN = 'authToken'

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const api = useApi()

    useEffect(() => {
        const validateToken = async () => {
            const token = getToken()
            if (token) {
                try {
                    const user = await api.recoveryUserInformation()
                    if (user) {
                        setUser(user)
                    }
                } catch (error) {
                    console.error('Failed to recover user information:', error)
                    setUser(null)
                    setToken('')
                }
            }
            setLoading(false)
        }
        validateToken()
    }, [])

    const signin = async ({ username, password }: SignInCredencional) => {
        try {
            const { user, token } = await api.signin({ username, password })

            if (!user && !token) return false

            setUser(user)
            setToken(token)
            return true
        } catch (error) {
            alert(error)
            return false
        }
    }

    const signout = async () => {
        setUser(null)
        setToken('')
        await api.logout()
    }

    const setToken = (token: string) => {
        localStorage.setItem(TOKEN, token)
    }

    const getToken = () => {
        return localStorage.getItem(TOKEN)
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
