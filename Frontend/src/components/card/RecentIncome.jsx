import React, { useEffect, useState } from 'react'
import PieCharts from '../chart/PieCharts'

const RecentIncome = ({ data, totalIncome }) => {

    const [chartData, setchartData] = useState([])

    const prepareChartData = () =>{
        const chartDatas = data?.slice(0, 4)?.map((element) =>({
            name: element?.source,
            amount: element?.amount
        }))
        setchartData(chartDatas)
    }

    useEffect(() =>{
        prepareChartData()
    }, [data])

  return (
    <div className='card'>
        <div className='flex items-center sm:flex-row flex-col justify-between'>
            <h5 className='text-lg'>Last 60 Days Income</h5>
        </div>

        <PieCharts data={chartData} colors={["#875CF5", "#FA2C37", "#FF6900", "#4F39F6"]} />
    </div>
  )
}

export default RecentIncome