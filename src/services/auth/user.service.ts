import axios, { handleResponse } from '../axios'

interface SignupValues {
    companyName: string
    name: string
    email: string
    phone: string
}

export const signup = async (data: SignupValues) => {
    try {
        const response = await axios({
            url: '/auth/user/signup',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const signupVerifyOtp = async (data: { otp: string; token: string | null }) => {
    try {
        const response = await axios({
            url: '/auth/user/verify-signup-otp',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const resendOtp = async (data: { token: string | null }) => {
    try {
        const response = await axios({
            url: '/auth/user/resend-signup-otp',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const createPassword = async (data: { password: string }) => {
    try {
        const response = await axios({
            url: '/auth/user/create-password',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const signin = async (data: { email: string; password: string }) => {
    try {
        const response = await axios({
            url: '/auth/user/signin',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}
