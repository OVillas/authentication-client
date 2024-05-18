import { ChangeEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth/AuthContext'

export const Login = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameInput = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!username && !password) alert('Please fill in the fields')

        const isLogged = await auth.signin({ username, password })
        if (isLogged) {
            navigate('/')
        } else {
            alert('Invalid credentials')
        }
    }

    return (
        <div className="bg-gray-300 w-full h-screen flex items-center justify-center">
            <div className="bg-white w-full flex-1 max-w-sm h-screen sm:h-[40rem] px-3 shadow-xl">
                <div className="px-6 py-8 mb-6">
                    <h3 className="text-primary-app-color text-2xl font-semibold">
                        Digital
                    </h3>
                </div>
                <form className="flex flex-col gap-5 w-full max-w-4xl px-3">
                    <h1 className="text-2xl font-bold text-primary-app-color">
                        Artificial Intelligence Driving <br />
                        <span>Results For The TravelIndustry</span>
                    </h1>
                    <p className="text-gray-500 text-xs self-start max-w-2xl">
                        Welcome back! Please login to your account.
                    </p>
                    <div className="flex flex-col m2-2 w-full">
                        <label
                            className="block text-gray-700 text-md font-bold mb-2 ml-1"
                            htmlFor="username"
                        >
                            E-mail
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameInput}
                            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-app-color"
                            placeholder="Enter your e-mail"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label
                            className="block text-gray-700 text-md font-bold mb-2 ml-1"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordInput}
                            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-app-color"
                            placeholder="Enter your password"
                            required
                        />
                        <div className="flex justify-between px-2 py-3 items-center">
                            <div className="flex items-center">
                                <input
                                    id="default-checkbox"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                                />
                                <label
                                    htmlFor="default-checkbox"
                                    className="ms-2 text-sm font-medium text-gray-600"
                                >
                                    Remember me
                                </label>
                            </div>
                            <a
                                className="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-500 duration-500"
                                href="#"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <button
                            className="bg-primary-app-color hover:bg-blue-500 duration-500 text-white font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            onClick={handleLogin}
                        >
                            Sign In
                        </button>

                        <button className="border-solid border-2 border-primary-app-color hover:bg-primary-app-color hover:text-white duration-500 text-black font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline">
                            Sign Up
                        </button>
                    </div>
                    <div className="w-full max-w-7xl mx-auto grid grid-cols-3 sm:grid-cols-4 ml-4 gap-2 sm:gap-5 mt-3 items-center">
                        <span className="text-sm">login with</span>
                        <a
                            href="#"
                            className="text-primary-app-color font-semibold hover:text-blue-500 duration-500"
                        >
                            Facebook
                        </a>
                        <a
                            href="#"
                            className="text-primary-app-color font-semibold hover:text-blue-500 duration-500"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="#"
                            className="text-primary-app-color font-semibold hover:text-blue-500 duration-500"
                        >
                            Google
                        </a>
                    </div>
                </form>
            </div>

            <div className="bg-gray-100 w-full hidden sm:flex flex-1 flex-col max-w-xl h-screen sm:h-[40rem] items-center py-12 shadow-lg">
                <nav className="flex items-center gap-12 mb-8">
                    <a href="#" className="text-gray-600 hover:underline">
                        Home
                    </a>
                    <a href="#" className="text-gray-600 hover:underline">
                        About us
                    </a>
                    <a href="#" className="text-gray-600 hover:underline">
                        Blog
                    </a>
                    <a href="#" className="text-gray-600 hover:underline">
                        Pricing
                    </a>
                </nav>
                <img
                    src="./assets/cycle.png"
                    alt="Image of a cyclist"
                    className="w-full h-96 mt-8"
                />
            </div>
        </div>
    )
}
