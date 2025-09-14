import type { Employee } from '@/types/Employee'
import { useFormik } from 'formik'
import type { ChangeEvent } from 'react'
import * as Yup from 'yup'

interface EmployeeModalProps {
    show: boolean
    onClose: () => void
    onSave: (values: Employee | Omit<Employee, 'id'>) => void
    editingEmployee?: Employee | null
}

const employeeSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    ssn: Yup.string()
        .matches(/^\d{3}-\d{2}-\d{4}$/, 'Invalid SSN format (XXX-XX-XXXX)')
        .required('SSN is required'),
    address1: Yup.string().required('Address 1 is required'),
    address2: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string().trim().required('State is required'),
    zip: Yup.string()
        .matches(/^[1-9]+$/, 'Only numbers are allowed')
        .required('Zip code is required'),
    country: Yup.string().required('Country is required'),
})

const EmployeeModal = ({ show, onClose, onSave, editingEmployee }: EmployeeModalProps) => {
    const formik = useFormik({
        initialValues: editingEmployee
            ? editingEmployee
            : { name: '', ssn: '', address1: '', address2: '', city: '', state: '', zip: '', country: '' },
        validationSchema: employeeSchema,
        onSubmit: (values, { setSubmitting }) => {
            console.log('values: ', values)
            onSave(values)
            setSubmitting(false)
            formik.resetForm()
        },
        enableReinitialize: true,
    })

    const handleSsnChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '')
        if (value.length > 9) value = value.slice(0, 9)
        let formatted = ''
        if (value.length > 5) {
            formatted = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5)}`
        } else if (value.length > 3) {
            formatted = `${value.slice(0, 3)}-${value.slice(3)}`
        } else {
            formatted = value
        }
        formik.setFieldValue('ssn', formatted)
    }

    return (
        <>
            {show && (
                <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
                    <div className='bg-white rounded-lg shadow-xl p-8 m-4 max-w-2xl w-full max-h-full overflow-y-auto'>
                        <h2 className='text-2xl font-bold mb-6'>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
                        <form onSubmit={formik.handleSubmit} className='space-y-4'>
                            <div>
                                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                                    Name
                                </label>
                                <input
                                    id='name'
                                    type='text'
                                    {...formik.getFieldProps('name')}
                                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className='mt-1 text-sm text-red-600'>{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor='ssn' className='block text-sm font-medium text-gray-700'>
                                        SSN
                                    </label>
                                    <input
                                        id='ssn'
                                        name='ssn'
                                        type='text'
                                        placeholder='XXX-XX-XXXX'
                                        onChange={handleSsnChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.ssn}
                                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                                    />
                                    {formik.touched.ssn && formik.errors.ssn ? (
                                        <div className='mt-1 text-sm text-red-600'>{formik.errors.ssn}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <label htmlFor='address1' className='block text-sm font-medium text-gray-700'>
                                        Address 1
                                    </label>
                                    <input
                                        id='address1'
                                        type='text'
                                        {...formik.getFieldProps('address1')}
                                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                                    />
                                    {formik.touched.address1 && formik.errors.address1 ? (
                                        <div className='mt-1 text-sm text-red-600'>{formik.errors.address1}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor='address2' className='block text-sm font-medium text-gray-700'>
                                        Address 2
                                    </label>
                                    <input
                                        id='address2'
                                        type='text'
                                        {...formik.getFieldProps('address2')}
                                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                                    />
                                </div>
                                <div>
                                    <label htmlFor='city' className='block text-sm font-medium text-gray-700'>
                                        City
                                    </label>
                                    <input
                                        id='city'
                                        type='text'
                                        {...formik.getFieldProps('city')}
                                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                                    />
                                    {formik.touched.city && formik.errors.city ? (
                                        <div className='mt-1 text-sm text-red-600'>{formik.errors.city}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <div>
                                    <label htmlFor='state' className='block text-sm font-medium text-gray-700'>
                                        State
                                    </label>
                                    <input
                                        id='state'
                                        type='text'
                                        {...formik.getFieldProps('state')}
                                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                                    />

                                    {formik.touched.state && formik.errors.state ? (
                                        <div className='mt-1 text-sm text-red-600'>{formik.errors.state}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <label htmlFor='zip' className='block text-sm font-medium text-gray-700'>
                                        Zip Code
                                    </label>
                                    <input
                                        id='zip'
                                        type='text'
                                        {...formik.getFieldProps('zip')}
                                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                                    />
                                    {formik.touched.zip && formik.errors.zip ? (
                                        <div className='mt-1 text-sm text-red-600'>{formik.errors.zip}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <label htmlFor='country' className='block text-sm font-medium text-gray-700'>
                                        Country
                                    </label>
                                    <input
                                        id='country'
                                        type='text'
                                        {...formik.getFieldProps('country')}
                                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                                    />
                                    {formik.touched.country && formik.errors.country ? (
                                        <div className='mt-1 text-sm text-red-600'>{formik.errors.country}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex justify-end gap-4 pt-4'>
                                <button type='button' onClick={onClose} className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300'>
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    disabled={formik.isSubmitting}
                                    className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50'
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default EmployeeModal
