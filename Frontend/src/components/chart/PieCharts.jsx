import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const PieCharts = ({ data, colors }) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie data={data} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={130} innerRadius={100} labelLine={false}>
          {data?.map((element, index) =>(
            <Cell key={index} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieCharts