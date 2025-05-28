import moment from 'moment'

export const validateEmail = (email) =>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
}

export const addThousandSeparator = (num) =>{
    if(num == null | isNaN(num)){
        return ""
    }

    const [integerPart, fractionalPart] = num.toString().split(".")
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger
}

export const prepareExpenseBarChartData = (data) =>{
    const chartData = data?.map((element) =>({
        category: element?.category,
        amount: element?.amount
    }))

    return chartData
}

export const prepareIncomeBarChartData = (data) =>{
    const sortedDate = data && [...data]?.sort((a, b) =>new Date(a?.date) - new Date(b?.date))

    const chartData = sortedDate?.map((element) =>({
        month: moment(element?.date).format("Do MMM"),
        source: element?.source,
        amount: element?.amount
    }))

    return chartData
}

export const prepareExpenseLineChartData = (data) =>{
    const sortedDate = data && [...data]?.sort((a, b) =>new Date(a?.date) - new Date(b?.date))

    const chartData = sortedDate?.map((element) =>({
        month: moment(element?.date).format("Do MMM"),
        category: element?.category,
        amount: element?.amount
    }))

    return chartData
}