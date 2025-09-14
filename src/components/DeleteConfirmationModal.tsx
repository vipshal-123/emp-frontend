interface DeleteModelProp {
    show: boolean
    onClose: () => void
    onConfirm: () => void
}

const DeleteConfirmationModal = ({ show, onClose, onConfirm }: DeleteModelProp) => {
    if (!show) return null
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
            <div className='bg-white rounded-lg shadow-xl p-8 m-4 max-w-sm w-full'>
                <h2 className='text-xl font-bold mb-4'>Are you sure?</h2>
                <p className='text-gray-600 mb-6'>Do you really want to delete this employee? This process cannot be undone.</p>
                <div className='flex justify-end gap-4'>
                    <button onClick={onClose} className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300'>
                        Cancel
                    </button>
                    <button onClick={onConfirm} className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmationModal
