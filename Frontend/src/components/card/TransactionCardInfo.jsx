import { Trash2, TrendingDown, TrendingUp, Utensils } from 'lucide-react'
import React from 'react'

const TransactionCardInfo = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete }) => {
  return (
    <div className='group rounded-lg hover:bg-gray-200 duration-300 relative flex items-center gap-4 mt-2 p-3'>
        <div className='size-12 rounded-full flex bg-gray-100 items-center justify-center text-xl text-gray-800'>
            {icon ? 
                <img src={icon} alt={title} className='size-6' /> :
                <Utensils />
            }
        </div>

        <div className='flex-1 flex items-center justify-between'>
            <div className='flex-1'>
                <p className='text-sm text-gray-700 font-medium'>{title}</p>
                <p className='text-xs text-gray-400 mt-1'>{date}</p>
            </div>

            <div className='flex items-center gap-2'>
                {!hideDeleteBtn && <button className='text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-red-500' onClick={() =>onDelete()}><Trash2 size={18} /></button>}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${type == "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"}`}>
                    <h6 className='text-xs lg:text-sm font-medium'>{type == "income" ? "+" : "-"} ${amount}</h6>
                    {type == "income" ? <TrendingUp />: <TrendingDown />}
                </div>
            </div>
        </div>
    </div>
  )
}

export default TransactionCardInfo