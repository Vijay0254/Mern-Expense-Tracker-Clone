import { MoveRight } from 'lucide-react'
import React from 'react'
import TransactionCardInfo from './TransactionCardInfo'
import moment from 'moment'

const ExpenseTransaction = ({ transactions, onSeeMore }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h1 className='text-lg'>Expenses</h1>
            <button className='card-btn' onClick={onSeeMore}>See All <MoveRight className='text-base' /></button>
        </div>

        <div>
            {transactions?.slice(0, 5)?.map((element) =>(
                <TransactionCardInfo key={element._id} title={element.category} icon={element.icon} date={moment(element.date).format("Do MMM YYYY")} amount={element.amount} type="expense" hideDeleteBtn />
            ))}
        </div>
    </div>
  )
}

export default ExpenseTransaction