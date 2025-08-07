import React, { JSX } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard(): JSX.Element {

    const { user } = useAuth();

    return (
        <div>Dashboard</div>
    )
}
