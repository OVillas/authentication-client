import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../data/contexts/Auth/AuthContext'

export const Home = () => {
    const auth = useContext(AuthContext)

    const handleLogout = async () => {
        await auth.signout()
        window.location.href = window.location.href
    }
    return (
        <div className="App">
            <header className="">
                <h1 className="font-bold">Header do site</h1>
                <nav>
                    <Link to="/home">Home</Link>
                    {auth.user && <button onClick={handleLogout}>Sair</button>}
                </nav>
            </header>
            <hr />
        </div>
    )
}
