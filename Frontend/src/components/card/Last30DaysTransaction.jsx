import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/utils'
import BarCharts from '../chart/BarCharts';


const Last30DaysTransaction = ({ data }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        setChartData(prepareExpenseBarChartData(data));
    }, [data]);
    
  return (
    <div>
        <div className='card col-span-1'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 30 Days Expenses</h5>
            </div>
            
            <BarCharts data={chartData} />
        </div>
    </div>
  )
}

export default Last30DaysTransaction