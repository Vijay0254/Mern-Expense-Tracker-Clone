import toast from 'react-hot-toast'
import { create } from "zustand";
import { Axios } from "../utils/Axios";
import { validateEmail } from "../utils/utils";

export const useAuthStore = create((set) =>({
    user: null,
    isCheckingAuth : true,

    isLoggingIn: false,
    isSigningUp: false,
    isLoggingOut: false,
    error: null,

    verifyToken: async(navigate) =>{
        try{
            const response = await Axios.get("/api/auth/verify/token")
            if(response.data.message == "Internal Server Error"){
                console.log(response.data.error)
                navigate('/500')
            }
            if(response.data.success){
                set({ user: response.data.user })
            }
        }
        catch(err){
            console.log(`Error in Verify Token - ${err.message}`)
        }
        finally{
            set({ isCheckingAuth: false })
        }
    },

    handleLogin: async(event, navigate, email, password) =>{
        event.preventDefault()
        if(!email){
            set({ error: "Email is Required" })
            return
        }
        if(!password){
            set({ error: "Password is Required" })
            return
        }
        if(!validateEmail(email)){
            set({ error: "Invalid Email" })
            return
        }
        
        set({ isLoggingIn: true })
        try{
            const response = await Axios.post("/api/auth/login", {email: email, password: password})
            if(response.data.message == "Internal Server Error"){
                console.log(response.data)
                navigate('/500')
            }
            if(!response.data.success){
                set({ error: response.data.message })
            }
            if(response.data.success){
                set({ user: response.data.user })
            }
        }
        catch(err){
            console.log(`Error in Handle Login - ${err.message}`)
        }
        finally{
            set({ isLoggingIn: false })
        }
    },

    handleSignup: async(event, navigate, fullName, email, password, profileImg) =>{
        event.preventDefault()
        if(!fullName){
            set({ error: "Name is Required" })
            return
        }
        if(!email){
            set({ error: "Email is Required" })
            return
        }
        if(!password){
            set({ error: "Password is Required" })
            return
        }
        if(!validateEmail(email)){
            set({ error: "Invalid Email" })
            return
        }
        if(password.length < 8){
            set({ error: "Password is Weak" })
            return
        }

        set({ isSigningUp: true })
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profileImg", profileImg);
        
        try{
            const response = await Axios.post("/api/auth/signup", formData)
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            if(!response.data.success){
                set({ error: response.data.message })
            }
            if(response.data.success){
                set({ user: response.data.user })
            }
        }
        catch(err){
            console.log(`Error in Handle Signup - ${err.message}`)
        }
        finally{
            set({ isSigningUp: false })
        }
    },

    handleLogout: async(navigate) =>{
        set({ isLoggingOut: true })
        try{
            const response = await Axios.get("/api/auth/logout")
            if(response.data.message == "Internal Server Error"){
                navigate('/500')
            }
            if(response.data.success){
                set({ user: null })
            }
        }
        catch(err){
            console.log(`Error in Handle Logout - ${err.message}`)
        }
        finally{
            set({ isLoggingOut: false })
        }
    }
}))