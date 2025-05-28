import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import { useExpenseStore } from '../store/useExpenseStore'
import { Loader2 } from 'lucide-react'
import ExpenseOverview from '../components/expense/ExpenseOverview'
import ExpenseList from '../components/expense/ExpenseList'
import DeleteAlert from '../components/modals/DeleteAlert'
import Modal from '../components/modals/Modal'
import AddExpenseForm from '../components/expense/AddExpenseForm'

const Expense = () => {

  const [openAddExpenseModel, setopenAddExpenseModel] = useState(false)
  const [openDeleteAlert, setopenDeleteAlert] = useState({
    show: false,
    data: null
  })

  const { expenseData, isFetchingExpense, isAddingExpense, isDeletingExpense, isDownloadingExpense, fetchExpenseDetails, downloadExpenseDetails, addExpense, deleteExpense } = useExpenseStore()
  const navigate = useNavigate()

  useEffect(() =>{
    fetchExpenseDetails(navigate)
  }, [isAddingExpense, isDeletingExpense])

  return (
    <DashboardLayout activeMenu="Expense">
      {!isFetchingExpense ?
        <section className='my-5 mx-auto'>
          <div className='grid grid-cols-1 gap-6'>
            <div>
              <ExpenseOverview transactions={expenseData} onAddExpense={() =>setopenAddExpenseModel(true)} />
            </div>

            <ExpenseList transactions={expenseData} onDelete={(id) =>{setopenDeleteAlert({show: true, data: id})}} onDownload={downloadExpenseDetails} isDownloadingExpense={isDownloadingExpense} />
          </div>

          <Modal isOpen={openAddExpenseModel} onClose={() =>setopenAddExpenseModel(false)} title="Add Expense">
            <AddExpenseForm onAddExpense={addExpense} isAddingExpense={isAddingExpense} setopenAddExpenseModel={setopenAddExpenseModel} />
          </Modal>

          <Modal isOpen={openDeleteAlert.show} onClose={() =>setopenDeleteAlert({show: false, data: null})} title="Delete Expense">
            <DeleteAlert content="Are you sure you want to delete this expense detail?" onDelete={() =>deleteExpense(navigate, openDeleteAlert.data, setopenDeleteAlert)} isDeletingExpense={isDeletingExpense} />
          </Modal>
        </section> :
        <div className='flex justify-center items-center mt-44 gap-x-2'>
          <Loader2 className='animate-spin size-10' />
          <p className='text-3xl font-bold font-serif'>Loading...</p>
        </div>
      }
    </DashboardLayout>
  )
}

export default Expense