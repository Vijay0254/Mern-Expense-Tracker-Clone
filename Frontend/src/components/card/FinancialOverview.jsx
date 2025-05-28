import React from 'react'
import { BALANCE_DATA } from '../../utils/data'
import PieCharts from '../chart/PieCharts'

const FinancialOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Financial Overview</h5>
        </div>

        <PieCharts data={BALANCE_DATA(totalBalance, totalIncome, totalExpense)} colors={["#875CF5", "#FA2C37", "#FF6900"]} />
    </div>
  )
}

export default FinancialOverview