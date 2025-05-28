import toast from 'react-hot-toast'
import { create } from "zustand";
import { Axios } from "../utils/Axios";

export const useExpenseStore = create((set) =>({
    expenseData: null,
    isFetchingExpense: false,
    isAddingExpense: false,
    isDeletingExpense: false,
    isDownloadingExpense: false,

    fetchExpenseDetails: async(navigate) =>{
        set({ isFetchingExpense: true })
        try{
            const response = await Axios.get("/api/expense/get/all")
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            if(!response.data.success){
                toast.error(response.data.message)
            }
            if(response.data.success){
                set({ expenseData: response.data.userExpense })
            }
        }
        catch(err){
            console.log(`Error in Fetch Expense Details - ${err.message}`)
        }
        finally{
            set({ isFetchingExpense: false })
        }
    },

    addExpense: async(navigate, expense, setexpense, setopenAddExpenseModel) =>{
        set({ isAddingExpense: true })
        try{
            const response = await Axios.post("/api/expense/add", {icon: expense.icon, category: expense.category, amount: expense.amount, date: expense.date})
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            if(!response.data.success){
                toast.error(response.data.message)
            }
            if(response.data.success){
                toast.success("Expense Added")
                setexpense({
                    icon: "",
                    category: "",
                    amount: "",
                    date: ""
                })
                setopenAddExpenseModel(false)
            }
        }
        catch(err){
            console.log(`Error in Add Expense Details - ${err.message}`)
        }
        finally{
            set({ isAddingExpense: false })
        }
    },

    deleteExpense: async(navigate, expenseId, setopenDeleteAlert) =>{
        set({ isDeletingExpense: true })
        try{
            const response = await Axios.delete(`/api/expense/delete/${expenseId}`)
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            if(!response.data.success){
                toast.error(response.data.message)
            }
            if(response.data.success){
                toast.success("Expense Deleted")
                setopenDeleteAlert({
                    show: false,
                    data: null
                })
            }
        }
        catch(err){
            console.log(`Error in Delete Expense Details - ${err.message}`)
        }
        finally{
            set({ isDeletingExpense: false })
        }
    },

    downloadExpenseDetails: async(navigate) =>{
        set({ isDownloadingExpense: true })
        try{
            const response = await Axios.get("/api/expense/download", {responseType: "blob"})
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", "expense_details.xlsx")
            document.body.appendChild(link)
            link.click()
            link.parentNode.removeChild(link)
            window.URL.revokeObjectURL(url)        
        }
        catch(err){
            console.log(`Error in Download Expense Details - ${err.message}`)
        }
        finally{
            set({ isDownloadingExpense: false })
        }
    },

}))