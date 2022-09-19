const express = require('express');
const route1 = express.Router();
var database = require('../database');
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
var cookieParser = require('cookie-parser');
const moment = require('moment');
const Web3 = require('web3');
const { application } = require('express');
const cors= require('cors');
const dotenv= require('dotenv');
const { urlencoded } = require('body-parser');
const app=express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
var bodyParser1 = require('body-parser');  
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser1.urlencoded({ extended: false })  

route1.post('/totalsold',(response,request)=>{
    let query = `select * from product_details where isSold=1`;
    database.query(query, function (error, data) {
        request.json({
            sucess : data
        });
    });
});
route1.post('/totalunsold',(request,response)=>{
    let query = `select * from product_details where isSold=0`;
    // console.log(query);
    let dataa;
    database.query(query, function (error, data) {
        // dataa=data;
        response.json({
            success : data
        });
    });
    // dataa= JSON
// console.log('test');
});
route1.get('/listunsold',(request,response)=>{
    response.render('listunsold',{
        layout:false,
        session: request.session
    });
});




route1.get('/listsold',(request,response)=>{
    response.render('listsold',{
        layout:false,
        session: request.session
    });
});


route1.post('/gettransactiondetailsunsold',urlencodedParser,(request,response)=>{
    let pid=request.body.uid; 
    
    let query = `select * from transactiondetails where product_id=${pid} and isSold=0`;
    // console.log(query);
    let dataa;
    database.query(query, function (error, data) {
        // dataa=data;
        response.json({
            success : data
        });
    });
    dataa= JSON
});
route1.post('/gettransactiondetailssold',urlencodedParser,(request,response)=>{
    let pid=request.body.uid; 
    
    let query = `select * from transactiondetails where product_id=${pid} and isSold=1`;
    // console.log(query);
    let dataa;
    database.query(query, function (error, data) {
        // dataa=data;
        response.json({
            success : data
        });
    });
    dataa= JSON
});

// const child_process = require('child_process');

// const folderpath = '../assests/Images/qrimages';

// route1.get("/download-zip", (req, res) => {

//   // we want to use a sync exec to prevent returning response
//   // before the end of the compression process
//   child_process.execSync(`zip -r archive *`, {
//     cwd: folderpath
//   });

//   // zip archive of your folder is ready to download
//   res.download(folderpath + '/qrcodes.zip');
// });
const archiver = require('archiver');

// /**
//  * @param {String} sourceDir: /some/folder/to/compress
//  * @param {String} outPath: /path/to/created.zip
//  * @returns {Promise}
//  */
const fs=require('fs');
route1.get("/download-zip", (req, res) => {
var zipper = require('zip-local');

zipper.sync.zip("./assets/Images/qrimages").compress().save("./assets/Images/qrimages.zip");
// const folderpath="../assets";
// zipDirectory("../assets/Images/qrimages","../assets");
res.download("./assets/Images/qrimages.zip");
});
route1.get("/productid=:id", function (req, res) {
    console.log(req.params.id);
    let id=req.params.id;
    // res.send(req.params.id);
    let q = `SELECT * FROM product_details where qr_encrypt="${id}"`;
    database.query(q, function (error, data) {
      if(data){
        if((data.length>0)){
          console.log(data.length);
          res.redirect('/usermanual');
        }
        // console.log(error);
      }else{
        console.log(error);
      }
      
    });
  });

module.exports = route1;