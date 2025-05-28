import toast from 'react-hot-toast'
import { create } from "zustand";
import { Axios } from "../utils/Axios";

export const useIncomeStore = create((set) =>({
    incomeData: null,
    isFetchingIncome: false,
    isAddingIncome: false,
    isDeletingIncome: false,
    isDownloadingIncome: false,

    fetchIncomeDetails: async(navigate) =>{
        set({ isFetchingIncome: true })
        try{
            const response = await Axios.get("/api/income/get/all")
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            if(!response.data.success){
                toast.error(response.data.message)
            }
            if(response.data.success){
                set({ incomeData: response.data.userIncome })
            }
        }
        catch(err){
            console.log(`Error in Fetch Income Details - ${err.message}`)
        }
        finally{
            set({ isFetchingIncome: false })
        }
    },

    addIncome: async(navigate, income, setincome, setopenAddIncomeModel) =>{
        set({ isAddingIncome: true })
        try{
            const response = await Axios.post("/api/income/add", {icon: income.icon, source: income.source, amount: income.amount, date: income.date})
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            if(!response.data.success){
                toast.error(response.data.message)
            }
            if(response.data.success){
                toast.success("Income Added")
                setincome({
                    icon: "",
                    source: "",
                    amount: "",
                    date: ""
                })
                setopenAddIncomeModel(false)
            }
        }
        catch(err){
            console.log(`Error in Add Income Details - ${err.message}`)
        }
        finally{
            set({ isAddingIncome: false })
        }
    },

    deleteIncome: async(navigate, incomeId, setopenDeleteAlert) =>{
        set({ isDeletingIncome: true })
        try{
            const response = await Axios.delete(`/api/income/delete/${incomeId}`)
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            if(!response.data.success){
                toast.error(response.data.message)
            }
            if(response.data.success){
                toast.success("Income Deleted")
                setopenDeleteAlert({
                    show: false,
                    data: null
                })
            }
        }
        catch(err){
            console.log(`Error in Delete Income Details - ${err.message}`)
        }
        finally{
            set({ isDeletingIncome: false })
        }
    },

    downloadIncomeDetails: async(navigate) =>{
        set({ isDownloadingIncome: true })
        try{
            const response = await Axios.get("/api/income/download", {responseType: "blob"})
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", "income_details.xlsx")
            document.body.appendChild(link)
            link.click()
            link.parentNode.removeChild(link)
            window.URL.revokeObjectURL(url)    
        }
        catch(err){
            console.log(`Error in Download Income Details - ${err.message}`)
        }
        finally{
            set({ isDownloadingIncome: false })
        }
    },

}))