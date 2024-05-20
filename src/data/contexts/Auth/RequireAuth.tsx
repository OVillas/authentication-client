import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!user) {
        return <Navigate to="/signIn" />;
    }

    return children;
}
