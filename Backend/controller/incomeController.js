const IncomeModel = require("../model/IncomeModel")
const excelDownload = require("../utils/excelDownload")

const addIncomeController = async(req, res) =>{
    try{
        const userId = req.user._id
        const { icon, source, amount, date } = req.body

        if(!source || !amount){
            return res.status(200).json({message: 'All Fields are required', success: false})
        }

        const newIncome = IncomeModel({
            userId: userId,
            icon: icon,
            source: source,
            amount: amount,
            date: date ? new Date(date) : date
        })
        await newIncome.save()
        return res.status(200).json({success: true, message: "Income Added"})
    }
    catch(err){
        console.log(`Error in Add Income Controller - ${err.message}`)
        return res.status(200).json({message: 'Internal Server Error', error: err.message})
    }
}

const deleteIncomeController = async(req, res) =>{
    try{
        const { id } = req.params
        await IncomeModel.findByIdAndDelete(id)
        return res.status(200).json({success: true, message: "Income Deleted"})
    }
    catch(err){
        console.log(`Error in Delete Income Controller - ${err.message}`)
        return res.status(200).json({message: 'Internal Server Error', error: err.message})
    }
}

const getAllIncomeController = async(req, res) =>{
    try{
        const userId = req.user._id
        const userIncome = await IncomeModel.find({userId: userId}).sort({date: -1})
        return res.status(200).json({success: true, userIncome: userIncome})
    }
    catch(err){
        console.log(`Error in Get All Income Controller - ${err.message}`)
        return res.status(200).json({message: 'Internal Server Error', error: err.message})
    }
}

const downloadIncomeController = async(req, res) =>{
    try{
        const userId = req.user._id
        const userIncome = await IncomeModel.find({userId: userId}).sort({date: -1})

        const data = userIncome.map((element, index) =>({
            Sno: ++index,
            Source: element.source,
            Amount: element.amount,
            Date: element.date
        }))

        //Function to convert JSON to Excel and Download it
        excelDownload(data, res, "income")
    }
    catch(err){
        console.log(`Error in Download Income Controller - ${err.message}`)
        return res.status(200).json({message: 'Internal Server Error', error: err.message})
    }
}

module.exports = { addIncomeController, deleteIncomeController, getAllIncomeController, downloadIncomeController }