import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmojiPickerPopup from '../modals/EmojiPickerPopup'
import { Loader2 } from 'lucide-react'
import Input from '../inputs/Input'

const AddExpenseForm = ({ onAddExpense, isAddingExpense, setopenAddExpenseModel }) => {
    const [expense, setexpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: ""
    })

    const navigate = useNavigate()

    const handleChange = (key, value) =>setexpense({...expense, [key]: value})

  return (
    <div>
        <EmojiPickerPopup icon={expense.icon} onSelect={((selectedIcon) =>handleChange("icon", selectedIcon))} />
        <Input value={expense.category} onChange={((event) =>handleChange("category", event.target.value))} label="Expense" placeholder="Food, Game, etc" type="text" />
        <Input value={expense.amount} onChange={((event) =>handleChange("amount", event.target.value))} label="Amount" placeholder="" type="number" />
        <Input value={expense.date} onChange={((event) =>handleChange("date", event.target.value))} label="Date" placeholder="" type="date" />
    
        <div className='flex justify-end mt-6'>
            <button disabled={isAddingExpense} type='button' className='add-btn add-btn-fill' onClick={() =>onAddExpense(navigate, expense, setexpense, setopenAddExpenseModel)}>{isAddingExpense ? <Loader2 className='animate-spin size-5' /> : "Add Expense"}</button>
        </div>
    </div>
  )
}

export default AddExpenseForm