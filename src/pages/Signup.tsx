import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormCard from '@/components/FormCard'
import { signup } from '@/services/auth/user.service'
import { setLocal } from '@/utils/storage'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { openToast } from '@/redux/slice/toastSlice'
import type { AppDispatch } from '@/redux/store'

interface SignupValues {
    companyName: string
    name: string
    email: string
    phone: string
}

const signUpSchema = Yup.object().shape({
    companyName: Yup.string().required('Company name is required'),
    name: Yup.string().required('Contact person is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
})

const initialValues = { companyName: '', name: '', email: '', phone: '' }

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = async (values: SignupValues) => {
        try {
            const response = await signup(values)

            if (response.success) {
                formik.resetForm()
                setLocal('token', response.token)
                navigate('/verify-email')
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
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: handleSubmit,
    })

    return (
        <FormCard title='Create Employer Account' subtitle='Register as an employer to manage employees'>
            <form onSubmit={formik.handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                    <div>
                        <label htmlFor='companyName' className='block text-sm font-medium text-gray-700'>
                            Company Name
                        </label>
                        <input
                            id='companyName'
                            type='text'
                            {...formik.getFieldProps('companyName')}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                        {formik.touched.companyName && formik.errors.companyName && (
                            <div className='mt-1 text-sm text-red-600'>{formik.errors.companyName}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                            Contact Person
                        </label>
                        <input
                            id='name'
                            type='text'
                            {...formik.getFieldProps('name')}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                        {formik.touched.name && formik.errors.name && <div className='mt-1 text-sm text-red-600'>{formik.errors.name}</div>}
                    </div>
                </div>

                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                        Work Email
                    </label>
                    <input
                        id='email'
                        type='email'
                        {...formik.getFieldProps('email')}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    />
                    {formik.touched.email && formik.errors.email && <div className='mt-1 text-sm text-red-600'>{formik.errors.email}</div>}
                </div>

                <div>
                    <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
                        Phone
                    </label>
                    <input
                        id='phone'
                        type='tel'
                        placeholder='+91 1234567890'
                        {...formik.getFieldProps('phone')}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    />
                    {formik.touched.phone && formik.errors.phone && <div className='mt-1 text-sm text-red-600'>{formik.errors.phone}</div>}
                </div>

                {/* Submit */}
                <div>
                    <button
                        type='submit'
                        disabled={formik.isSubmitting}
                        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
                    >
                        Create Account
                    </button>
                </div>
            </form>

            <p className='mt-6 text-center text-sm text-gray-600'>
                Already registered?{' '}
                <button onClick={() => navigate('/signin')} className='font-medium text-blue-600 hover:text-blue-500'>
                    Sign in
                </button>
            </p>
        </FormCard>
    )
}

export default SignUp
