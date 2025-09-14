import axios, { handleResponse } from '../axios'

export const signup = async (data) => {
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

export const signupVerifyOtp = async (data) => {
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

export const resendOtp = async (data) => {
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

export const createPassword = async (data) => {
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

export const signin = async (data) => {
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