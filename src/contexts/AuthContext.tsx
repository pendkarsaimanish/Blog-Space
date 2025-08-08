import React, { createContext, useContext, useEffect, useState } from "react";
import { AppwriteUser, AuthContextType } from "../types";
import { createAppwriteUser, deleteUserSession, getAppwriteUser, loginUser } from "../lib/auth";
import { AppwriteException } from "appwrite";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<AppwriteUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const user = async () => {
            try {
                const user = await getAppwriteUser()
                if (user) {
                    setUser(user);
                    setUserLoading(false)
                }
            } catch (err) {
                setUserLoading(false)
            } finally { setUserLoading(false) }
        }
        user()
    }, [])

    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        setLoading(true)
        setError(null)
        try {
            const newUser = await createAppwriteUser(email, password, name)
            if (newUser) {
                const n = await loginUser(email, password);
                if (n) {
                    const user = await getAppwriteUser()
                    setUser(user)
                    setLoading(false)
                    return true;
                }
            }
            return false;
        } catch (err) {
            if (err instanceof AppwriteException) {
                if (err.code === 409) {
                    setError('Email already exists')
                }
            }
            return false;
        } finally {
            setLoading(false)
        }
    }

    const login = async (email: string, password: string): Promise<boolean> => {
        setLoading(true);
        setError(null)
        try {
            const user = await loginUser(email, password);
            if (user) {
                const user = await getAppwriteUser();
                setUser(user)
                setLoading(false);
                return true;
            }
            return false
        } catch (err) {
            setError(err.message)
            setLoading(false)
            return false
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        setUser(null);
        await deleteUserSession();
        document.documentElement.classList.remove("dark");
    }

    return <AuthContext.Provider value={{ user, setUser, register, login, userLoading, logout, loading, error, }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};