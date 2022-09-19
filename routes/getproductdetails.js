const express = require('express');
const route2 = express.Router();
var database = require('../database');
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
var cookieParser = require('cookie-parser');
const moment = require('moment');
const Web3 = require('web3');
const mycontract = require('../smart contract/client/src/contracts/SimpleStorage.json');
const crypto = require("crypto")
const encrypt = (plainText, password) => {
  try {
    const iv = crypto.randomBytes(16);
    const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(plainText);
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return iv.toString('hex') + '-' + encrypted.toString('hex');
  } catch (error) {
    console.log(error);
  }
}
const decrypt = (encryptedText, password) => {
    try {
      const textParts = encryptedText.split('-');
      const iv = Buffer.from(textParts.shift(), 'hex');
      const encryptedData = Buffer.from(textParts.join(':'), 'hex');
      const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
      
      const decrypted = decipher.update(encryptedData);
      const decryptedText = Buffer.concat([decrypted, decipher.final()]);
      return decryptedText.toString();
    } catch (error) {
      console.log(error)
    }
  }

// ('../../react project/client/src/contracts/SimpleStorage.json');



route2.use(express.json());
// const { application } = require('express');
// const cors= require('cors');
// const dotenv= require('dotenv');
// const { urlencoded } = require('body-parser');
// const app=express();

// dotenv.config();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false}));

// Create application/x-www-form-urlencoded parser  
// var urlencodedParser = bodyParser.urlencoded({ extended: false })  

// route2.post('/getproductdetails',urlencodedParser,(response,request)=>{
//     let pid=response.body.uid; 
//     console.log(JSON.stringify(response.body));
//     // console.log(response.body);
//     // console.log();
//     let query = `select * from product_details where product_id=${pid}`;
//     database.query(query, function (error, data) {
//         request.json({
//             sucess : data,
//             error:error
//         });
//     });
// });



route2.post('/profile-edit', encoder, (request, response) => {
let uid= request.body.uid;
let email= request.body.email;
let fname= request.body.fname;
let lname= request.body.lname;
let address= request.body.address;
let city= request.body.city;
let country= request.body.country;
let postal= request.body.postal;
let aboutus= request.body.aboutus;
let username= request.body.username;
// console.log("uid:"+uid,"email:"+email,"fname:"+fname,"lname:"+lname,"address:"+address,"city:"+city,"country:"+country,"postal:"+postal,"aboutus:"+aboutus);
// response.JSON(uid);
let query = `UPDATE userlogin SET email='${email}',username='${username}',name='${fname}',lname='${lname}',address='${address}',city='${city}',country='${country}',postal='${postal}',aboutme='${aboutus}' WHERE id=${uid}`;
// console.log(query);
// let dataa;
console.log(query);
database.query(query, function (error, data) {
    // console.log(data,error);
    if(data){
        response.json({
           msg:"success"
        });

    }else if(error){
        response.json({
            msg:"unsuccess"
         });
    }
});
});
route2.post('/getproductdetails', encoder, (request, response) => {
    let pid = decrypt(request.body.uid,"Rushikesh");
    
    // console.log(request.body);
    // console.log(response.body);
    // console.log(request.body.uid);

    let query = `select * from product_details where product_id=${pid}`;
    // console.log(query);
    let dataa;
    database.query(query, function (error, data) {
        // dataa=data;
        // console.log(data);
        response.json({
            success: data
        });
    });

});
route2.get("/claimwarranty", function (req, res, next) {
    if (req.session.user_id && req.session.prid) {
        let prid=req.session.prid;
        // console.log("address here. "+ req.session.addre);
        res.render("claimwarranty", {
            prid: prid
        });

        res.end();
    } else {
        res.redirect('/welcome');
    }
});
route2.post('/setwarr', encoder, (request, response) => {
    request.session.prid= request.body.uid;
// res.redirect('/claimwarranty');
response.json({
    status: true
});

});
route2.post('/userdetails', encoder, (request, response) => {

});
route2.post('/setproductwarranty', encoder, (request, response) => {
    (async () => {

        let pid = decrypt(request.body.uid,"Rushikesh");
        let fname = request.body.fname;
        let email = request.body.email;
        let addr1 = request.body.addr1;
        let country = request.body.country;
        let state = request.body.state;
        let city = request.body.city;
        let mobile = request.body.mobile;
       
        let addre = request.session.addre;
        
const Provider = require('@truffle/hdwallet-provider');
const MyContract = require('../smart contract/client/src/contracts/SimpleStorage.json');
const address = '0x8e8Ef3E7D09D1fE0683f9B782860Bb00e41DE660';
const privateKey = '4925f96bd005d94c76b3646593aba2615f4b65b197160bdf96ce9a586d41067e';
const infuraUrl = 'https://ropsten.infura.io/v3/cecc686c7c684ee981dd2961d36d084c';
const mycontractt = "0x25450a840B504cb1Bde85E61463e446F8890dDAB";
const provider = new Provider(privateKey, infuraUrl);
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    console.log("networkid->", networkId);
    web3.eth.handleRevert = true;
    const myContract = new web3.eth.Contract(
      MyContract.abi,
      MyContract.networks[networkId].address
    );


    // gasPrice: "4712388",
    // gas: "4712388",
    // to: mycontractt,
    // value: "",
    // data: ""

    // gas: 4712388,
    // gasPrice: 4712388,
    const addresses = web3.eth.getAccounts();
    console.log(addresses);
    web3.eth.signTransaction({
      from: addre,
    
    }).then(console.log).catch(console.log);

    web3.eth.handleRevert = true;

        // 
        const result = await myContract.methods.set_warranty(pid).send({
            from: addre,
           
        }).then((result) => {
            // console.log(result);
            let month;
            let query1 = `SELECT * from product_details where product_id='${pid}'`;
            // console.log("product details query "+query1);
            database.query(query1, function (error, data) {
                // month= data;
                month = data[0].period;
                // console.log("error->" + error);

                // console.log(month);

                // console.log("month data "+month);
                let warrstart = Math.floor(Date.now() / 1000);
                // console.log("this is warr start "+warrstart)
                let warendmonth = 2629743 * month;
                // console.log("this is warr end month "+warendmonth);
                let warrend = warrstart + warendmonth;
                // console.log("this is warr end "+ warrend);
                let query = `UPDATE product_details SET warr_start='${warrstart}',warr_end='${warrend}',isSold='1' WHERE product_id='${pid}'`;

                // console.log(query);
                database.query(query, function (error, data) {
                    if (data) {
                        
                        web3.eth.getTransactionReceipt(result.transactionHash).then(result => {
                            //    console.log(result);
                            let manu_date = Math.floor(Date.now() / 1000);
                            let query1 = `INSERT INTO transactiondetails(isSold, product_id,uid,transactionhash, transactionIndex, blockHash,blockNumber,from_address,to_address,gasUsed,cumulativeGasUsed,date) VALUES ('1','${pid}','${request.session.uid}','${result.transactionHash}','${result.transactionIndex}','${result.blockHash}','${result.blockNumber}','${result.from}','${result.to}','${result.gasUsed}','${result.cumulativeGasUsed}','${manu_date}')`;
                            // console.log(query1);
                            database.query(query1, function (error, data) {
                                if (data) {
                                    let query12 =  `INSERT INTO userdetails(fname, product_id, email, mobile, addr1, country, state, city) VALUES ('${fname}','${pid}','${email}','${mobile}','${addr1}','${country}','${state}','${city}')`;
                            // console.log(query1);
                            database.query(query12, function (error, data) {
                                if (data) {
                                    response.json({
                                        success: "success"
                                    });     
                                    
                                }else{
                                    console.log(error);
                                    response.json({
                                        error: error
                                    });  
                                }

                            });

                                    
                                }

                            });

                        });
                        // console.log("Data inserted successfully and data inserted in database" +error);
                        // res.render("index", {
                        //     error: "",
                        //     status: "user Registered Successfully and added to database..!",
                        //     session: req.session
                        // });
                    }
                });
            });



            // response.json({
            //     status: true
            // });
            // res.render('qrs', {
            //     status: true,
            //     productid: productid,
            // });
            // // res.send({status:true,productid: productid});

            // res.end();
            // console.log(result);
        }).catch((err) => {
            console.log(err);
            response.json({
                error: err
            });  
            // console.log("error from set waranty " + err);
            // res.render('qrs', {
            //     status: "false",
            //     productid: productid,
            // });
            // // res.json({status: false,productid: productid});
            // res.end();
            // console.log(err);
            // let message = JSON.parse(err.message.substring(56).trim().replace("'", "")).value.data;
            // console.log("something Went Wrong Please check if product is Set.!");

        });



        // let query = `select * from product_details where product_id=${pid}`;
        // console.log(query);
        // let dataa;
        // database.query(query, function (error, data) {
        //     // dataa=data;
        //     console.log(data);
        //     response.json({
        //         success : data
        //     });
        // });
        // dataa= JSON
    })();
});





module.exports = route2;