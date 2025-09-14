import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'
import EmployeeModal from '@/components/EmployeeModel'
import useFetchApi from '@/hooks/useFetchApi'
import { fetchUserData } from '@/redux/slice/authSlice'
import { openToast } from '@/redux/slice/toastSlice'
import { addEmployee, deleteEmployee, employeeList, signout, updateEmployee } from '@/services/v1/user.service'
import { removeLocal } from '@/utils/storage'
import isEmpty from 'is-empty'
import { EditIcon, Trash } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import type { AppDispatch } from '@/redux/store'
import type { Employee } from '@/types/Employee'

const EmployeeManagement = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [showModal, setShowModal] = useState(false)
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [deletingEmployeeId, setDeletingEmployeeId] = useState<string | null>(null)
    const { cursor, fetchData, hasMore, items, loading, setItems } = useFetchApi<Employee>(employeeList, { requiresId: false })

    const handleAdd = () => {
        setEditingEmployee(null)
        setShowModal(true)
    }

    const handleEdit = async (employee: Employee) => {
        setEditingEmployee(employee)
        setShowModal(true)
    }

    const handleDelete = (id: string) => {
        setDeletingEmployeeId(id)
        setShowDeleteConfirm(true)
    }

    const confirmDelete = async () => {
        if (!deletingEmployeeId) return
        try {
            const response = await deleteEmployee(deletingEmployeeId)

            if (response.success) {
                setShowDeleteConfirm(false)
                setDeletingEmployeeId(null)
                setItems((prev) => prev.filter((item) => item.id !== deletingEmployeeId))
                dispatch(openToast({ message: response.message, type: 'success' }))
            } else {
                dispatch(openToast({ message: response.message, type: 'error' }))
            }
        } catch (error) {
            console.error('error: ', error)
            dispatch(openToast({ message: 'Something went wrong', type: 'error' }))
        }
    }

    const handleSave = async (values: Employee) => {
        try {
            if (!isEmpty(editingEmployee) && editingEmployee) {
                const response = await updateEmployee(values, editingEmployee?.id)

                if (response.success) {
                    setShowModal(false)
                    setItems((prev) =>
                        prev.map((item) =>
                            item?.id === editingEmployee?.id
                                ? {
                                      ...values,
                                  }
                                : item,
                        ),
                    )
                    dispatch(openToast({ message: response.message, type: 'success' }))
                } else {
                    console.log(response.message)
                    dispatch(openToast({ message: response.message, type: 'error' }))
                }
            } else {
                const response = await addEmployee(values)

                if (response.success) {
                    setShowModal(false)
                    setItems((prev) => [...prev, { ...values, id: response.id }])
                    dispatch(openToast({ message: response.message, type: 'success' }))
                } else {
                    dispatch(openToast({ message: response.message, type: 'error' }))
                }
            }
        } catch (error) {
            console.error('error: ', error)
            dispatch(openToast({ message: 'Something went wrong', type: 'success' }))
        }
    }

    const handleSignOut = async () => {
        try {
            const response = await signout()

            if (response.success) {
                removeLocal('access_token')
                dispatch(fetchUserData())
                navigate('/')
                dispatch(openToast({ message: response.message, type: 'success' }))
            } else {
                dispatch(openToast({ message: response.message, type: 'error' }))
            }
        } catch (error) {
            console.error('error: ', error)
            dispatch(openToast({ message: 'Something went wrong', type: 'success' }))
        }
    }

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col'>
            <header className='bg-white shadow-md'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3'>
                    <div>
                        <h1 className='text-xl sm:text-2xl font-bold text-gray-800'>Employee Management</h1>
                        <p className='text-sm text-gray-500'>Manage employees</p>
                    </div>
                    <div className='flex flex-wrap items-center gap-2 sm:gap-4'>
                        <button
                            onClick={handleAdd}
                            className='bg-blue-600 text-white px-3 py-2 sm:px-4 rounded-md hover:bg-blue-700 shadow-sm text-sm sm:text-base'
                        >
                            Add Employee
                        </button>
                        <button onClick={() => handleSignOut()} className='text-sm font-medium text-gray-600 hover:text-gray-900'>
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <main className='flex-1 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-8 w-full'>
                <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
                    <div id='scrollableDiv' className='overflow-y-auto' style={{ maxHeight: '70vh' }}>
                        <InfiniteScroll
                            dataLength={items.length}
                            next={() => fetchData(cursor)}
                            hasMore={hasMore}
                            loader={loading && <p className='text-center py-4 text-gray-500'>Loading...</p>}
                            scrollThreshold='90%'
                            scrollableTarget='scrollableDiv'
                        >
                            <div className='overflow-x-auto'>
                                <table className='w-full text-sm text-left text-gray-500'>
                                    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                                        <tr>
                                            <th scope='col' className='px-3 sm:px-6 py-3'>
                                                Name
                                            </th>
                                            <th scope='col' className='px-3 sm:px-6 py-3'>
                                                SSN
                                            </th>
                                            <th scope='col' className='px-3 sm:px-6 py-3'>
                                                City
                                            </th>
                                            <th scope='col' className='px-3 sm:px-6 py-3'>
                                                State
                                            </th>
                                            <th scope='col' className='px-3 sm:px-6 py-3'>
                                                Zip
                                            </th>
                                            <th scope='col' className='px-3 sm:px-6 py-3'>
                                                Country
                                            </th>
                                            <th scope='col' className='px-3 sm:px-6 py-3 text-center'>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!isEmpty(items) ? (
                                            items.map((emp) => (
                                                <tr key={emp.id} className='bg-white border-b hover:bg-gray-50 text-xs sm:text-sm'>
                                                    <td className='px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{emp.name}</td>
                                                    <td className='px-3 sm:px-6 py-4'>{emp.ssn}</td>
                                                    <td className='px-3 sm:px-6 py-4'>{emp.city}</td>
                                                    <td className='px-3 sm:px-6 py-4'>{emp.state}</td>
                                                    <td className='px-3 sm:px-6 py-4'>{emp.zip}</td>
                                                    <td className='px-3 sm:px-6 py-4'>{emp.country}</td>
                                                    <td className='px-3 sm:px-6 py-4'>
                                                        <div className='flex justify-center items-center gap-3'>
                                                            <button onClick={() => handleEdit(emp)} className='p-1 sm:p-2'>
                                                                <EditIcon className='w-4 h-4 sm:w-5 sm:h-5' />
                                                            </button>
                                                            <button onClick={() => handleDelete(emp.id)} className='p-1 sm:p-2'>
                                                                <Trash className='w-4 h-4 sm:w-5 sm:h-5' />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7} className='text-center py-10 text-gray-500 text-sm sm:text-base'>
                                                    No employees yet. Click "Add Employee" to create one.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </main>
            <EmployeeModal show={showModal} onClose={() => setShowModal(false)} onSave={handleSave} editingEmployee={editingEmployee} />
            <DeleteConfirmationModal show={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} onConfirm={confirmDelete} />
        </div>
    )
}

export default EmployeeManagement
