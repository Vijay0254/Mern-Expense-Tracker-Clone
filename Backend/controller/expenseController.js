const ExpenseModel = require("../model/ExpenseModel")
const excelDownload = require("../utils/excelDownload")

const addExpenseController = async(req, res) =>{
    try{
        const userId = req.user._id
        const { icon, category, amount, date } = req.body

        if(!category || !amount){
            return res.status(200).json({message: 'All Fields are required', success: false})
        }

        const newExpense = ExpenseModel({
            userId: userId,
            icon: icon,
            category: category,
            amount: amount,
            date: date ? new Date(date) : date
        })
        await newExpense.save()
        return res.status(200).json({success: true, message: "Expense Added"})
    }
    catch(err){
        console.log(`Error in Add Expense Controller - ${err.message}`)
        return res.status(200).json({message: 'Internal Server Error', error: err.message})
    }
}

const deleteExpenseController = async(req, res) =>{
    try{
        const { id } = req.params
        await ExpenseModel.findByIdAndDelete(id)
        return res.status(200).json({success: true, message: "Expense Deleted"})
    }
    catch(err){
        console.log(`Error in Delete Expense Controller - ${err.message}`)
        return res.status(200).json({message: 'Internal Server Error', error: err.message})
    }
}

const getAllExpenseController = async(req, res) =>{
    try{
        const userId = req.user._id
        const userExpense = await ExpenseModel.find({userId: userId}).sort({date: -1})
        return res.status(200).json({success: true, userExpense: userExpense})
    }
    catch(err){
        console.log(`Error in Get All Expense Controller - ${err.message}`)
        return res.status(200).json({message: 'Internal Server Error', error: err.message})
    }
}

const downloadExpenseController = async(req, res) =>{
    try{
        const userId = req.user._id
        const userExpense = await ExpenseModel.find({userId: userId}).sort({date: -1})

        const data = userExpense.map((element, index) =>({
            Sno: ++index,
            Category: element.category,
            Amount: element.amount,
            Date: element.date
        }))

        //Function to convert JSON to Excel and Download it
        excelDownload(data, res, "expense")
    }
    catch(err){
        console.log(`Error in Download Expense Controller - ${err.message}`)
        return res.status(200).json({message: 'Internal Server Error', error: err.message})
    }
}

module.exports = { addExpenseController, deleteExpenseController, getAllExpenseController, downloadExpenseController }