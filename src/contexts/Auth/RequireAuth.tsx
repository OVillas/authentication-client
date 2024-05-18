import { useContext } from 'react';
import { Login } from '../../pages/Login';
import { AuthContext } from './AuthContext';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!user) {
        return <Login />;
    }

    return children;
}
