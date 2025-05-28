import React, { useEffect } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import { useDashboardStore } from '../store/useDashboardStore'
import { useNavigate } from 'react-router-dom'
import InfoCard from '../components/card/InfoCard'
import { CreditCard, HandCoins, WalletMinimal } from 'lucide-react'
import { addThousandSeparator } from '../utils/utils'
import RecentTransactions from '../components/card/RecentTransactions'
import FinancialOverview from '../components/card/FinancialOverview'
import ExpenseTransaction from '../components/card/ExpenseTransaction'
import Last30DaysTransaction from '../components/card/Last30DaysTransaction'
import RecentIncome from '../components/card/RecentIncome'
import FewIncomes from '../components/card/FewIncomes'

const Home = () => {

  const { fetchDashboardData, dashboardData } = useDashboardStore()
  const navigate = useNavigate()

  useEffect(() =>{
    fetchDashboardData(navigate)
  }, [])

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mb-10 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard icon={<CreditCard />} label="Total Balance" value={addThousandSeparator(dashboardData?.totalBalance || 0)} color="bg-primary" />
          <InfoCard icon={<HandCoins />} label="Total Income" value={addThousandSeparator(dashboardData?.totalIncome || 0)} color="bg-orange-500" />
          <InfoCard icon={<WalletMinimal />} label="Total Expense" value={addThousandSeparator(dashboardData?.totalExpense || 0)} color="bg-red-500" />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions transactions={dashboardData?.recentTransactions} onSeeMore={() =>navigate("/expense")} />
          <FinancialOverview totalBalance={dashboardData?.totalBalance || 0} totalIncome={dashboardData?.totalIncome || 0} totalExpense={dashboardData?.totalExpense || 0} />
          <ExpenseTransaction transactions={dashboardData?.last30DaysExpense?.transaction} onSeeMore={() =>navigate("/expense")} />
          <Last30DaysTransaction data={dashboardData?.last30DaysExpense?.transaction} />
          <RecentIncome data={dashboardData?.last60DaysIncome?.transaction} totalIncome={dashboardData?.totalIncome} />
          <FewIncomes transaction={dashboardData?.last60DaysIncome?.transaction} onSeeMore={() =>navigate("/income")} />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home