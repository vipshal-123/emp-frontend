import type { Employee } from '@/types/Employee'
import axios, { handleResponse } from '../axios'

export const userInfo = async () => {
    try {
        const response = await axios({
            url: '/v1/user/user-info',
            method: 'GET',
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const employeeList = async (params: { next?: string | undefined; limit?: number }) => {
    try {
        const response = await axios({
            url: '/v1/user/employees',
            method: 'GET',
            params: { next: params?.next, limit: params?.limit },
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const addEmployee = async (data: Omit<Employee, 'id'>) => {
    try {
        const response = await axios({
            url: '/v1/user/add-employee',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const updateEmployee = async (data: Employee, id: string) => {
    try {
        const response = await axios({
            url: `/v1/user/employee/${id}`,
            method: 'PUT',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const deleteEmployee = async (id: string) => {
    try {
        const response = await axios({
            url: `/v1/user/employee/${id}`,
            method: 'DELETE',
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const signout = async () => {
    try {
        const response = await axios({
            url: '/v1/user/signout',
            method: 'POST',
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}
