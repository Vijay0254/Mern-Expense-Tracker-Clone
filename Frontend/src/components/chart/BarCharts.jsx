import React from 'react'
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts'

const BarCharts = ({ data }) => {

  return (
    <div className='bg-white mt-6'>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid stroke='none' />

                <XAxis dataKey="month" tick={{fontSize: 12, fill: "#555"}} stroke='none' />
                <YAxis tick={{fontSize: 12, fill: "#555"}} stroke='none' />
                
                <Bar dataKey="amount" fill='#875CF5' radius={[10, 10, 0, 0]} activeDot={{r: 8, fill: "yellow"}} activeStyle={{fill: "green"}}>
                    {data?.map((element, index) =>(
                        <Cell key={index} fill={index % 2 === 0 ? "#875CF5" : "#CFBEFB"} />
                    ))}
                </Bar>
                
                <Tooltip />
                <Legend />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default BarCharts