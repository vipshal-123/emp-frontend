import EyeIcon from '@/components/EyeIcon'
import FormCard from '@/components/FormCard'
import { fetchUserData } from '@/redux/slice/authSlice'
import { openToast } from '@/redux/slice/toastSlice'
import { createPassword } from '@/services/auth/user.service'
import { removeLocal, setLocal } from '@/utils/storage'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const createPasswordSchema = Yup.object().shape({
    newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
})

const CreatePassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

    const handleSubmit = async (values) => {
        try {
            const payload = {
                password: values.newPassword,
            }
            const response = await createPassword(payload)

            if (response.success) {
                formik.resetForm()
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
            dispatch(openToast({ message: 'Something went wrong', type: 'success' }))
        }
    }

    const formik = useFormik({
        initialValues: { newPassword: '', confirmNewPassword: '' },
        validationSchema: createPasswordSchema,
        onSubmit: handleSubmit,
    })
    return (
        <FormCard title='Create New Password' subtitle='Your new password must be different from previous ones.'>
            <form onSubmit={formik.handleSubmit} className='space-y-6'>
                <div>
                    <label htmlFor='newPassword' className='block text-sm font-medium text-gray-700'>
                        New Password
                    </label>
                    <div className='relative mt-1'>
                        <input
                            id='newPassword'
                            type={isPasswordVisible ? 'text' : 'password'}
                            {...formik.getFieldProps('newPassword')}
                            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                        <EyeIcon toggle={() => setPasswordVisible(!isPasswordVisible)} isVisible={isPasswordVisible} />
                    </div>
                    {formik.touched.newPassword && formik.errors.newPassword ? (
                        <div className='mt-1 text-sm text-red-600'>{formik.errors.newPassword}</div>
                    ) : null}
                </div>
                <div>
                    <label htmlFor='confirmNewPassword' className='block text-sm font-medium text-gray-700'>
                        Confirm New Password
                    </label>
                    <div className='relative mt-1'>
                        <input
                            id='confirmNewPassword'
                            type={isConfirmPasswordVisible ? 'text' : 'password'}
                            {...formik.getFieldProps('confirmNewPassword')}
                            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                        <EyeIcon toggle={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)} isVisible={isConfirmPasswordVisible} />
                    </div>
                    {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
                        <div className='mt-1 text-sm text-red-600'>{formik.errors.confirmNewPassword}</div>
                    ) : null}
                </div>
                <div>
                    <button
                        type='submit'
                        disabled={formik.isSubmitting}
                        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
                    >
                        Create Password
                    </button>
                </div>
            </form>
        </FormCard>
    )
}

export default CreatePassword
