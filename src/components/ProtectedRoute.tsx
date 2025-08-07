import React, { JSX } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Navigate } from 'react-router'
import Loader from './Loader'

export default function ProtectedRoute({ children }): JSX.Element {
    const { user, userLoading, loading } = useAuth()

    if (userLoading) return <div className='h-svh flex justify-center items-center'><Loader size='larger' /></div>

    return user ? <>{children}</> : <Navigate to={"/login"} replace />
}
