import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { RequireAuth } from './data/contexts/Auth/RequireAuth'
import { SignUp } from './pages/SignUp'
import { ConfirmEmail } from './pages/Email/Confirm'

export const AppRoutes = () => (
    <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/email/confirm" element={<ConfirmEmail />} />
        <Route
            path="/home"
            element={
                <RequireAuth>
                    <Home />
                </RequireAuth>
            }
        />
        <Route path="*" element={<Navigate to="/signIn" />} />
    </Routes>
)
