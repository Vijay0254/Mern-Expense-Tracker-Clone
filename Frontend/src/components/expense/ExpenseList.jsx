import React from 'react'
import TransactionCardInfo from '../card/TransactionCardInfo'
import { Download, Loader2 } from 'lucide-react'
import moment from 'moment'

const ExpenseList = ({ transactions, onDelete, onDownload, isDownloadingExpense }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Expense</h5>

            <button disabled={isDownloadingExpense} className='card-btn' onClick={onDownload}>
                {isDownloadingExpense ? <Loader2 className='animate-spin size-5' /> : <><Download className='sm:text-base text-sm' /> <span className='sm:block hidden'>Download</span></>}
            </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions?.map((element) =>(
                <TransactionCardInfo key={element._id} title={element.category} icon={element.icon} date={moment(element.date).format("Do MMM YYYY")} amount={element.amount} type="expense" onDelete={() =>onDelete(element._id)} />
            ))}
        </div>
    </div>
  )
}

export default ExpenseList