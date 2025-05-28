import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import IncomeOverview from '../components/income/IncomeOverview'
import Modal from '../components/modals/Modal'
import { useIncomeStore } from '../store/useIncomeStore'
import { useNavigate } from 'react-router-dom'
import AddIncomeForm from '../components/income/AddIncomeForm'
import IncomeList from '../components/income/IncomeList'
import DeleteAlert from '../components/modals/DeleteAlert'
import { Loader2 } from 'lucide-react'

const Income = () => {

  const [openAddIncomeModel, setopenAddIncomeModel] = useState(false)
  const [openDeleteAlert, setopenDeleteAlert] = useState({
    show: false,
    data: null
  })

  const { incomeData, isFetchingIncome, isAddingIncome, isDeletingIncome, isDownloadingIncome, fetchIncomeDetails, downloadIncomeDetails, addIncome, deleteIncome } = useIncomeStore()
  const navigate = useNavigate()

  useEffect(() =>{
    fetchIncomeDetails(navigate)
  }, [isAddingIncome, isDeletingIncome])

  return (
    <DashboardLayout activeMenu="Income">
      {!isFetchingIncome ?
        <section className='my-5 mx-auto'>
          <div className='grid grid-cols-1 gap-6'>
            <div>
              <IncomeOverview transactions={incomeData} onAddIncome={() =>setopenAddIncomeModel(true)} />
            </div>

            <IncomeList transactions={incomeData} onDelete={(id) =>{setopenDeleteAlert({show: true, data: id})}} onDownload={downloadIncomeDetails} isDownloadingIncome={isDownloadingIncome} />
          </div>

          <Modal isOpen={openAddIncomeModel} onClose={() =>setopenAddIncomeModel(false)} title="Add Income">
            <AddIncomeForm onAddIncome={addIncome} isAddingIncome={isAddingIncome} setopenAddIncomeModel={setopenAddIncomeModel} />
          </Modal>

          <Modal isOpen={openDeleteAlert.show} onClose={() =>setopenDeleteAlert({show: false, data: null})} title="Delete Income">
            <DeleteAlert content="Are you sure you want to delete this income detail?" onDelete={() =>deleteIncome(navigate, openDeleteAlert.data, setopenDeleteAlert)} isDeletingIncome={isDeletingIncome} />
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

export default Income 