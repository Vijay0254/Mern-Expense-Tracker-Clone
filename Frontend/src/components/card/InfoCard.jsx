import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='flex gap-6 bg-white p-6 rounded-2xl shadow-md border border-gray-200 shadow-gray-100'>
        <div className={`size-14 flex items-center justify-center ${color} rounded-full drop-shadow-xl text-white text-[26px]`}>
            {icon}
        </div>
        <div>
            <h6 className='text-sm text-slate-500 mb-1'>{label}</h6>
            <span className='text-[22px]'>${value}</span>
        </div>
    </div>
  )
}

export default InfoCard