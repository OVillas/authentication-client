import { createContext } from 'react';
import { User } from '../../types/User';
import { SignInCredencional } from '../../types/SignInCredencional';

export type AuthContextType = {
    user: User | null;
    signin: ({username, password}: SignInCredencional) => Promise<{authenticated: boolean, path: string}>;
    signout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType>(null!);