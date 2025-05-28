import { HandCoins, LayoutDashboard, LogOutIcon, WalletMinimal } from "lucide-react";

export const SIDEBAR_DATA = [
    {
        id: 1,
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard"
    },
    {
        id: 2,
        label: "Income",
        icon: WalletMinimal,
        path: "/income"
    },
    {
        id: 3,
        label: "Expense",
        icon: HandCoins ,
        path: "/expense"
    },
    {
        id: 4,
        label: "Logout",
        icon: LogOutIcon,
        path: "/logout"
    },
]

export const BALANCE_DATA = (totalBalance, totalIncome, totalExpense) =>{
    return [
        {
            id: 1,
            name: "Total Balance",
            amount: totalBalance
        },
        {
            id: 2,
            name: "Total Income",
            amount: totalIncome
        },
        {
            id: 3,
            name: "Total Expense",
            amount: totalExpense
        },
    ]
}