const TOKEN = 'PULSETECH.AUTH_TOKEN'
export const AuthState = {
    getToken: () => {
        return localStorage.getItem(TOKEN)
    },
    setToken: (token: string) => {
        localStorage.setItem(TOKEN, token)
    },
    removeToken: () => {
        localStorage.removeItem(TOKEN)
    },
}
