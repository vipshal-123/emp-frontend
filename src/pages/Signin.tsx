// import EyeIcon from '@/components/EyeIcon'
import FormCard from '@/components/FormCard'
import { fetchUserData } from '@/redux/slice/authSlice'
import { openToast } from '@/redux/slice/toastSlice'
import type { AppDispatch } from '@/redux/store'
import { signin } from '@/services/auth/user.service'
import { removeLocal, setLocal } from '@/utils/storage'
import { useFormik } from 'formik'
import { Eye, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const signInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
})

const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [isPasswordVisible, setPasswordVisible] = useState(false)

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            const response = await signin(values)

            if (response.success) {
                setLocal('access_token', response?.accessToken)
                removeLocal('token')
                dispatch(fetchUserData())
                navigate('/dashboard')
                dispatch(openToast({ message: response.message, type: 'success' }))
            } else {
                console.log(response.message)
                dispatch(openToast({ message: response.message, type: 'error' }))
            }
        } catch (error) {
            console.error('error: ', error)
            dispatch(openToast({ message: 'Something went wrong', type: 'error' }))
        }
    }

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: signInSchema,
        onSubmit: handleSubmit,
    })

    return (
        <FormCard title='Employer Sign In' subtitle='Access your employer dashboard'>
            <form onSubmit={formik.handleSubmit} className='space-y-6'>
                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                        Email address
                    </label>
                    <input
                        id='email'
                        type='email'
                        placeholder='you@company.com'
                        {...formik.getFieldProps('email')}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    />
                    {formik.touched.email && formik.errors.email && <div className='mt-1 text-sm text-red-600'>{formik.errors.email}</div>}
                </div>

                <div>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                        Password
                    </label>
                    <div className='relative mt-1'>
                        <input
                            id='password'
                            type={isPasswordVisible ? 'text' : 'password'}
                            {...formik.getFieldProps('password')}
                            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10'
                        />
                        <button
                            type='button'
                            onClick={() => setPasswordVisible(!isPasswordVisible)}
                            className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                        >
                            {isPasswordVisible ? <Eye className='h-5 w-5' /> : <EyeOffIcon className='h-5 w-5' />}
                        </button>
                    </div>
                    {formik.touched.password && formik.errors.password && <div className='mt-1 text-sm text-red-600'>{formik.errors.password}</div>}
                </div>

                <div>
                    <button
                        type='submit'
                        disabled={formik.isSubmitting}
                        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
                    >
                        Sign In
                    </button>
                </div>
            </form>

            <p className='mt-6 text-center text-sm text-gray-600'>
                Not a member?{' '}
                <button onClick={() => navigate('/')} className='font-medium text-blue-600 hover:text-blue-500'>
                    Sign up
                </button>
            </p>
        </FormCard>
    )
}

export default SignIn
