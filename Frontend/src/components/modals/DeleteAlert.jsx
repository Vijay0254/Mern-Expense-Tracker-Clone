import { Loader2 } from 'lucide-react'
import React from 'react'

const DeleteAlert = ({ content, onDelete, isDeletingIncome }) => {
  return (
    <div>
        <p className='text-sm'>{content}</p>
        <div className='flex justify-end mt-6'>
            <button disabled={isDeletingIncome} type='button' className='add-btn add-btn-fill' onClick={onDelete}>{isDeletingIncome ? <Loader2 className='animate-spin size-4' /> : "Delete"}</button>
        </div>
    </div>
  )
}

export default DeleteAlert