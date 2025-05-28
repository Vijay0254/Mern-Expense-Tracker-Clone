const IncomeModel = require("../model/IncomeModel")
const ExpenseModel = require("../model/ExpenseModel")

const getDashboardDataController = async(req, res) =>{
    try{
        const userId = req.user._id

        //Aggregate
        const totalIncome = await IncomeModel.aggregate([
            {
                $match: {userId: userId}
            },
            {
                $group: {_id: null, total: {$sum: "$amount"}}
            }
        ])

        //Aggregate
        const totalExpense = await ExpenseModel.aggregate([
            {
                $match: {userId: userId}
            },
            {
                $group: {_id: null, total: {$sum: "$amount"}}
            }
        ])

        
        //For last 60 days
        //Income
        const last60DaysIncomeTransactions = await IncomeModel.find({
            userId: userId,
            date: {$gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)}
        }).sort({date: -1})

        const incomeLast60Days = last60DaysIncomeTransactions.reduce((sum, transaction) =>sum + transaction.amount, 0)

        //For last 30 days
        //Expense
        const last30DaysExpenseTransactions = await ExpenseModel.find({
            userId: userId,
            date: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
        }).sort({date: -1})

        const expenseLast30Days = last30DaysExpenseTransactions.reduce((sum, transaction) =>sum + transaction.amount, 0)


        //Fetching last 5 Transaction (income + expense)
        const last5Transactions = [
            ...(await IncomeModel.find({userId: userId}).sort({date: -1}).limit(5)).map((element) =>({
                ...element.toObject(),
                type: "income"
            })),
            ...(await ExpenseModel.find({userId: userId}).sort({date: -1}).limit(5)).map((element) =>({
                ...element.toObject(),
                type: "expense"
            }))
        ].sort((a, b) =>b.date - a.date)

        const overallData = {
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpense: {
                total: expenseLast30Days,
                transaction: last30DaysExpenseTransactions
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transaction: last60DaysIncomeTransactions
            },
            recentTransactions: last5Transactions
        }

        return res.status(200).json({success: true, overallData: overallData})
    }
    catch(err){
        console.log(`Error in Get Dashboard Data Controller - ${err.message}`)
        return res.status(200).json({message: 'Internal Server Error', error: err.message})
    }
}

module.exports = { getDashboardDataController }