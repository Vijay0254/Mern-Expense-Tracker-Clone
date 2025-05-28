import React from 'react'
import TransactionCardInfo from './TransactionCardInfo'
import { MoveRight } from 'lucide-react'
import moment from 'moment'

const FewIncomes = ({ transaction, onSeeMore }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income</h5>
            <button className='card-btn' onClick={onSeeMore}>See All <MoveRight className='text-base' /></button>
        </div>

        <div className='mt-6'>
            {transaction?.slice(0, 5)?.map((element) =>(
                <TransactionCardInfo key={element._id} title={element.source} icon={element.icon} date={moment(element.date).format("Do MMM YYYY")} amount={element.amount} type="income" hideDeleteBtn />
            ))}
        </div>
    </div>
  )
}

export default FewIncomes