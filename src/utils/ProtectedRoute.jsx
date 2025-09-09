import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import isEmpty from 'is-empty'

const ProtectedRoute = () => {
    const userAuth = useSelector((state) => state?.auth)

    if (userAuth?.loading) {
        return <div>Loading...</div>
    }

    if (isEmpty(userAuth) || !userAuth?.isAuth) {
        return <Navigate to='/signin' />
    }

    return <Outlet />
}

export default ProtectedRoute
