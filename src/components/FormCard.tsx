import type { ReactNode } from 'react'

interface FormCardProps {
    title: string
    subtitle: string
    children: ReactNode
}

const FormCard = ({ title, subtitle, children }: FormCardProps) => (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center items-center py-8 px-4 sm:py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <h2 className='text-center text-2xl sm:text-3xl font-extrabold text-gray-900'>{title}</h2>
            {subtitle && <p className='mt-2 text-center text-sm sm:text-base text-gray-600'>{subtitle}</p>}
        </div>
        <div className='mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white py-6 px-4 sm:py-8 sm:px-10 shadow-lg rounded-lg'>{children}</div>
        </div>
    </div>
)

export default FormCard
