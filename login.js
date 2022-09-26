const path = require('path');
const express= require("express");
const https= require('https');
const fs= require('fs');
var session = require('express-session');
const bodyParser= require("body-parser");
const app = express();
const mainRouter=require('./routes/index');
const mainRouter1=require('./routes/api-generation');
const mainRouter2=require('./routes/gettotalsold');
const mainRouter3=require('./routes/getproductbyqr');
const mainRouter4=require('./routes/getproductdetails');
const mainRouter5=require('./routes/addbatchproduct');


app.use('/ssl',(req,res,next)=>{
  res.send('hello from SSl Server');
});
 



// var cors = require ('cors');
// app.use(cors({
//   origin:['https://localhost:4500','https://127.0.0.1:4500'],
//     credentials:true
// }));


// app.use(function (req, res, next) {
  
//     res.header('Access-Control-Allow-Origin', "https://localhost");
//     res.header('Access-Control-Allow-Headers', true);
//     res.header('Access-Control-Allow-Credentials', 'Content-Type');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     next();
//   }); 

  
  app.use(session({secret: 'login', 
saveUninitialized: true,
 resave: true
//  cookie: {secure:false, maxAge:60000000}
}));


app.set('view engine', 'ejs');

// console.log(app.get('views'));
app.use("/assets",express.static("assets"));
app.use("/assets",express.static("assets/Images/qrimages"));



app.use(mainRouter);
app.use(mainRouter1);
app.use(mainRouter2);
app.use(mainRouter3);
app.use(mainRouter4);
app.use(mainRouter5);



const sslserver= https.createServer({
  key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
  cert:fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
},app)
let port=4500;
sslserver.listen(process.env.PORT || 5000,()=>{
     console.log(`Listening to requests on http://localhost:${port}`);
  }); 
// "192.168.0.104" || "localhost"
// process.env.PORT || 5000
// set app port
// app.listen(port, process.env.PORT || 5000 ,() => {
//   console.log(`Listening to requests on http://localhost:${port}`);
// });

// app.listen( port , ["192.168.0.104", "localhost" ],()=>{
//    console.log(`Listening to requests on http://localhost:${port}`);
// }); 
