import toast from 'react-hot-toast'
import { create } from "zustand";
import { Axios } from "../utils/Axios";

export const useDashboardStore = create((set) =>({
    dashboardData: null,
    isFetchingDashboard: false,

    fetchDashboardData: async(navigate) =>{
        set({ isFetchingDashboard: true })
        try{
            const response = await Axios.get("/api/dashboard/get/data")
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            if(!response.data.success){
                toast.error(response.data.message)
            }
            if(response.data.success){
                set({ dashboardData: response.data.overallData })
            }
        }
        catch(err){
            console.log(`Error in Fetch Dashboard Data - ${err.message}`)
        }
        finally{
            set({ isFetchingDashboard: false })
        }
    }
}))