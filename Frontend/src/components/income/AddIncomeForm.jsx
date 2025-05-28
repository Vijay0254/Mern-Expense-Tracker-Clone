import React, { useState } from 'react'
import Input from '../inputs/Input'
import { useNavigate } from 'react-router-dom'
import EmojiPickerPopup from '../modals/EmojiPickerPopup'
import { Loader2 } from 'lucide-react'

const AddIncomeForm = ({ onAddIncome, isAddingIncome, setopenAddIncomeModel }) => {

    const [income, setincome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: ""
    })

    const navigate = useNavigate()

    const handleChange = (key, value) =>setincome({...income, [key]: value})

  return (
    <div>
        <EmojiPickerPopup icon={income.icon} onSelect={((selectedIcon) =>handleChange("icon", selectedIcon))} />
        <Input value={income.source} onChange={((event) =>handleChange("source", event.target.value))} label="Income" placeholder="Freelance, Salary, etc" type="text" />
        <Input value={income.amount} onChange={((event) =>handleChange("amount", event.target.value))} label="Amount" placeholder="" type="number" />
        <Input value={income.date} onChange={((event) =>handleChange("date", event.target.value))} label="Date" placeholder="" type="date" />
    
        <div className='flex justify-end mt-6'>
            <button disabled={isAddingIncome} type='button' className='add-btn add-btn-fill' onClick={() =>onAddIncome(navigate, income, setincome, setopenAddIncomeModel)}>{isAddingIncome ? <Loader2 className='animate-spin size-5' /> : "Add Income"}</button>
        </div>
    </div>
  )
}

export default AddIncomeForm