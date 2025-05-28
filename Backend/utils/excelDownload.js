const xlsx = require('xlsx')

//Converting to Excel and Downloading
const excelDownload = (data, res, name) =>{
    //For Excel Name
    let title = name == "income" ? "income_details.xlsx" : "expense_details.xlsx" 
    
    //Starts Here
    const wb = xlsx.utils.book_new()
    const ws = xlsx.utils.json_to_sheet(data)
    xlsx.utils.book_append_sheet(wb, ws, `${name == "income" ? "Income" : "Expense"}`)

    // Generate the Excel file in memory
    const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

    // Send the buffer as a response
    return res.send(buffer);
}

module.exports = excelDownload