import FormCard from '@/components/FormCard'
import { openToast } from '@/redux/slice/toastSlice'
import { resendOtp, signupVerifyOtp } from '@/services/auth/user.service'
import { getLocal, removeLocal } from '@/utils/storage'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const otpSchema = Yup.object().shape({
    otp: Yup.string()
        .matches(/^\d{6}$/, 'Must be exactly 6 digits')
        .required('OTP is required'),
})

const OtpVerification = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (values) => {
        try {
            const localToken = getLocal('token')

            const payload = {
                otp: values.otp,
                token: localToken,
            }

            const response = await signupVerifyOtp(payload)

            if (response.success) {
                removeLocal('token')
                formik.resetForm()
                navigate('/create-password')
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

    const handleResendOtp = async () => {
        try {
            const localToken = getLocal('token')

            const payload = {
                token: localToken,
            }

            const response = await resendOtp(payload)

            if (response.success) {
                console.log(response.message)
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
        initialValues: { otp: '' },
        validationSchema: otpSchema,
        onSubmit: handleSubmit,
    })
    return (
        <FormCard title='Verify Your Account' subtitle='Enter the 6-digit code sent to your email.'>
            <form onSubmit={formik.handleSubmit} className='space-y-6'>
                <div>
                    <label htmlFor='otp' className='sr-only'>
                        OTP
                    </label>
                    <input
                        id='otp'
                        type='text'
                        maxLength='6'
                        {...formik.getFieldProps('otp')}
                        className='block w-full text-center text-2xl tracking-[1em] px-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                        placeholder='______'
                    />
                    {formik.touched.otp && formik.errors.otp ? (
                        <div className='mt-2 text-center text-sm text-red-600'>{formik.errors.otp}</div>
                    ) : null}
                </div>
                <div>
                    <button
                        type='submit'
                        disabled={formik.isSubmitting}
                        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
                    >
                        Verify
                    </button>
                </div>
            </form>
            <p className='mt-6 text-center text-sm text-gray-600'>
                Didn't receive a code?{' '}
                <button type='button' onClick={() => handleResendOtp()} className='font-medium text-blue-600 hover:text-blue-500'>
                    Resend
                </button>
            </p>
        </FormCard>
    )
}

export default OtpVerification
