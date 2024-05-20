import { ChangeEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cycle from '../../assets/images/png/cycle.png'
import { AuthContext } from '../../data/contexts/Auth/AuthContext'
import PrimaryUserInput from '../../ui/components/inputs/UserForm/PrimaryUserInput'
import { userApi } from '../../data/services/userApi'

export const SignUp = () => {
    const auth = useContext(AuthContext)
    const api = userApi
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [username] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (!name && !email && !password) {
                alert('Please fill in the fields')
                return
            }

            setIsLoading(true)
            const sucess = await api.signUp({
                name,
                email,
                username: email,
                password,
            })
            if (!sucess) {
                alert('Error creating user')
                return
            }

            const response = await auth.signin({ username: email, password })
            if (response.authenticated) {
                navigate(response.path)
            } else {
                navigate(response.path)
            }
        } catch (error) {
            alert(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-gray-300 w-full h-screen flex items-center justify-center">
            <div className="bg-white w-full flex-1 max-w-sm h-screen sm:h-[48rem] md:h-[40rem] px-3 shadow-xl">
                <div className="px-6 py-6">
                    <h3 className="text-primary-app-color text-2xl font-semibold">
                        Pulse <span className="text-gray-500">Tech</span>
                    </h3>
                </div>
                <form className="flex flex-col gap-5 w-full max-w-4xl px-3">
                    <h1 className="text-2xl font-bold text-primary-app-color">
                        Create Your Account
                    </h1>
                    <p className="text-gray-500 text-xs self-start max-w-2xl">
                        Join us to unlock the power of Pulse Tech and
                        revolutionize your travel experiences.
                    </p>
                    <PrimaryUserInput
                        labelContent="Full name"
                        inputType="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={handleNameInput}
                        autoFocus={true}
                    />

                    <PrimaryUserInput
                        labelContent="E-mail"
                        inputType="email"
                        placeholder="Enter your e-mail"
                        value={email}
                        onChange={handleEmailInput}
                    />

                    <div className="flex flex-col w-full">
                        <PrimaryUserInput
                            labelContent="Password"
                            inputType="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordInput}
                        />
                    </div>
                    <div className="w-full text-center">
                        <button
                            className="w-full bg-primary-app-color hover:bg-blue-500 duration-500 text-white font-bold py-2 px-12 sm:px-5 md:px-12 rounded focus:outline-none focus:shadow-outline items-center justify-center flex gap-2 sm:gap-5 mt-3"
                            type="submit"
                            onClick={handleSignUp}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        className="inline mr-3 w-4 h-4 text-white animate-spin"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"
                                        ></path>
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                    Loading...
                                </div>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                        <span className="text-gray-500">
                            Already have an account?{' '}
                            <a
                                className="text-primary-app-color"
                                href="/signIn"
                            >
                                sign in
                            </a>
                        </span>
                    </div>
                    <div className="w-full max-w-7xl mx-auto grid grid-cols-3 sm:grid-cols-4 ml-4 gap-2 sm:gap-5 mt-3 items-center flex-wrap sm:flex sm:flex-col md:flex-row">
                        <span className="text-sm">register with</span>
                        <div className="flex items-center gap-2 sm:gap-5">
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
                    </div>
                </form>
            </div>

            <div className="bg-gray-100 w-full hidden sm:flex flex-1 flex-col max-w-xl h-screen sm:h-[48rem] md:h-[40rem] items-center py-12 shadow-lg">
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
                    src={Cycle}
                    alt="Image of a person on a bicycle, also called a cyclist"
                    className="w-full h-96 mt-8"
                />
            </div>
        </div>
    )
}
