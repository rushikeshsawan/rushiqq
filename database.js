const mysql= require("mysql");


// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "autic"
// });
const connection = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6521838",
    password: "89mNjBXtxi",
    database: "sql6521838"
});
 
// connect to database
connection.connect(function(error){ 
    if(error) throw error
    else console.log("connected to database successfully")
});


module.exports= connection;  
