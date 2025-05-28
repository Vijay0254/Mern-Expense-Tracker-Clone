import { MoveRight } from 'lucide-react'
import React from 'react'
import moment from 'moment'
import TransactionCardInfo from './TransactionCardInfo'

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Recent Transactions</h5>
            <button className='card-btn' onClick={onSeeMore}>See All <MoveRight className='text-base' /></button>
        </div>

        <div>
            {transactions?.slice(0, 5)?.map((element) =>(
                <TransactionCardInfo key={element._id} title={element.type == "expense" ? element.category : element.source} icon={element.icon} date={moment(element.date).format("Do MMM YYYY")} amount={element.amount} type={element.type} hideDeleteBtn />
            ))}
        </div>
    </div>
  )
}

export default RecentTransactions