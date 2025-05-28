import React, { useEffect, useState } from 'react'
import BarCharts from '../chart/BarCharts'
import { Plus } from 'lucide-react'
import { prepareExpenseLineChartData } from '../../utils/utils'
import LineCharts from '../chart/LineCharts'

const ExpenseOverview = ({ transactions, onAddExpense }) => {
    const [chartData, setchartData] = useState([])

    useEffect(() =>{
        setchartData(prepareExpenseLineChartData(transactions))
    }, [transactions])

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-lg'>Expense Overview</h5>
          <p className='text-xs text-gray-400 mt-0.5'>Track your spending over time and analyze your expense trends...</p>
        </div>
        <button className='add-btn' onClick={onAddExpense}><Plus /><span className='sm:block hidden'>Add Expense</span></button>
      </div>

      <div className='mt-10'>
        <LineCharts data={chartData} />
      </div>
    </div>
  )
}

export default ExpenseOverview