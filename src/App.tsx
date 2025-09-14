import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/Signup'
import SignIn from './pages/Signin'
import OtpVerification from './pages/OtpVerification'
import CreatePassword from './pages/CreatePassword'
import EmployeeManagement from './pages/EmployeeManagement'
import ProtectedRoute from './utils/ProtectedRoute'
import OpenRoute from './utils/OpenRoute'

function App() {
    return (
        <>
            <Routes>
                <Route element={<OpenRoute />}>
                    <Route path='/' element={<SignUp />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/verify-email' element={<OtpVerification />} />
                    <Route path='/create-password' element={<CreatePassword />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path='/dashboard' element={<EmployeeManagement />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
