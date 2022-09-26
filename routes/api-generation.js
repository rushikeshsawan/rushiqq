const express = require('express');
const route = express.Router();
var database = require('../database');
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
var cookieParser = require('cookie-parser');
const moment = require('moment');
const Web3 = require('web3');

route.get("/logout", function (req, res, next) {
    req.session.destroy();
    res.redirect("/");
});


route.get("/qr", function (req, res) {

    res.render("qr", {
        error: "",
        session: req.session
    });

    res.end();
    // console.log(req.session);
});

route.get("/qrs", function (req, res) {
    if (req.session.user_id) {

        res.render("qrs", {
            error: "",
            session: req.session,
            status: "",
            productid: "",
        });

        res.end();
    } else {
        res.redirect("/");
        res.end();
    }

    // console.log(req.session);
});


route.post('/qrscanned', encoder, function (req, res) {

    // console.log("hello here.!");
    (async () => {


        if (req.session.user_id && req.session.addre) {
            // && req.session.addre
            console.log("qr scanner running here.!");
            const addre = req.session.addre;
            let month = req.body.month;
            let productid = req.body.productid;
            //
            const Provider = require('@truffle/hdwallet-provider');
const MyContract = require('../SimpleStorage.json');
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



    const addresses = web3.eth.getAccounts();
    console.log(addresses);
    web3.eth.signTransaction({
      from: addre,
      gasPrice: "4712388",
      gas: "4712388",
      to: mycontractt,
      value: "",
      data: ""
    }).then(console.log).catch(console.log);

    web3.eth.handleRevert = true;

            //
           
           
           

            const result = await MyContract.methods.set_warranty(productid).send({
                from: addre,
                gas: 4712388,
                gasPrice: 100000000000,
            }).then((result) => {
                let month;
                let query1 = `SELECT * from product_details where product_id='${manu_date}')`;
                database.query(query1, function (error, data) {
                // console.log(query);
                 month= data[0].period;
                });
                let warrstart = Math.floor(Date.now() / 1000);
                let warendmonth= 2629743;
                let warrend = (warrstart + (warendmonth * month));
                // console.log("this is warr end "+ warrend);
                let query = `UPDATE product_details SET warr_start='${warrstart}',warr_end='${warrend}',isSold='1' WHERE product_id='${productid}'`;
                // console.log(query);
                database.query(query, function (error, data) {
                    if (data) {
                        // let tx_id = '0x8d8574d549898bae3eaf9306aab2ff80d46324418df4e0adf5b1c4911182b7c6'
                        web3.eth.getTransactionReceipt(result.transactionHash).then(result => {
                            //    console.log(result);
                            let manu_date = Math.floor(Date.now() / 1000);
                            let query1 = `INSERT INTO transactiondetails(isSold, product_id,uid,transactionhash, transactionIndex, blockHash,blockNumber,from_address,to_address,gasUsed,cumulativeGasUsed,date) VALUES ('1','${productid}','${req.session.uid}','${result.transactionHash}','${result.transactionIndex}','${result.blockHash}','${result.blockNumber}','${result.from}','${result.to}','${result.gasUsed}','${result.cumulativeGasUsed}','${manu_date}')`;
                            // console.log(query1);
                            database.query(query1, function (error, data) {
                                if (data) {

                                    // console.log("transaction details added successfully.");
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




                // console.log("success from set warranty " + result);
                res.render('qrs', {
                    status: true,
                    productid: productid,
                });
                // res.send({status:true,productid: productid});

                res.end();
                // console.log(result);
            }).catch((err) => {
                // console.log("error from set waranty " + err);
                res.render('qrs', {
                    status: "false",
                    productid: productid,
                });
                // res.json({status: false,productid: productid});
                res.end();
                // console.log(err);
                // let message = JSON.parse(err.message.substring(56).trim().replace("'", "")).value.data;
                // console.log("something Went Wrong Please check if product is Set.!");

            });

            // const result1=await contract.methods.get_product_details('12345').call();
            // console.log("Product details are: " +  result1);

            // const data= await web3.eth.getData().call();





            // res.json({ month: req.body.month,qrcode: req.body.productid, session :req.session.user_id });
            // res.send([req.body.month,req.body.qrcode]);
            // res.end();
            // if(req.body['http://localhost:4500/productid']){

        } else {
            res.redirect("/");
            res.end();
        } 
    })(); 



    // }else{
    // }

});



route.get("/matindex", function (req, res, next) {

    res.render("matindex");

    res.end();
    // next();
    // console.log(req.session);
});

route.get("/matqrs", function (req, res, next) {

    res.render("matqrs");

    res.end();
    // next();
    // console.log(req.session);
});






module.exports = route;