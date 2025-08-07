import React, { JSX } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import Loader from './Loader';

interface PublicRouteProps {
    children: React.ReactNode
}

export default function PublicRoute({ children }: PublicRouteProps): JSX.Element {
    const { user, userLoading, loading } = useAuth();

    if (userLoading) return <div className='h-svh flex justify-center items-center'><Loader size='larger' /></div>

    return !user ? <>{children}</> : <Navigate to={"/dashboard"} replace />
}
