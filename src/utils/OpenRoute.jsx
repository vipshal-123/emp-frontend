import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const OpenRoute = () => {
    const userAuth = useSelector((state) => state.auth)

    if (userAuth?.isAuth) {
        return <Navigate to='/dashboard' replace />
    }

    return <Outlet />
}

export default OpenRoute
