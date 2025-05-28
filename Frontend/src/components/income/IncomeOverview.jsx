import React, { useEffect, useState } from 'react'
import { prepareIncomeBarChartData } from '../../utils/utils'
import { Plus } from 'lucide-react'
import BarCharts from '../chart/BarCharts'

const IncomeOverview = ({ transactions, onAddIncome }) => {

    const [chartData, setchartData] = useState([])

    useEffect(() =>{
        setchartData(prepareIncomeBarChartData(transactions))
    }, [transactions])

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-lg'>Income Overview</h5>
          <p className='text-xs text-gray-400 mt-0.5'>Track your earnings over time and analyze your income trends...</p>
        </div>
        <button className='add-btn' onClick={onAddIncome}><Plus /><span className='sm:block hidden'>Add Income</span></button>
      </div>

      <div className='mt-10'>
        <BarCharts data={chartData} />
      </div>
    </div>
  )
}

export default IncomeOverview